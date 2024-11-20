import React, { useEffect, useRef, useState } from 'react';
import { frequencies } from '../constants/frequencies.ts';
import { setupAudioNodes } from '../audio/audioNode.ts';
import {
  bezierFunction,
  draw,
  drawAllGaussianCurves,
  drawAverageGaussianCurve,
  drawBezierCurve,
  drawFrequencyLabels,
  drawPoint,
  drawRealTimeFrequencyCurve,
  gaussianFunction,
  getAverageGaussianY,
} from '../draw/drawFunction.ts';
import { Point } from '../utils/bezier.ts';
import { defaultPoints } from '../constants/defaultPoints.ts';

const StoryBook = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<MediaElementAudioSourceNode | null>(null);
  const analyserNodeRef = useRef<AnalyserNode | null>(null);
  const filterNodesRef = useRef<BiquadFilterNode[]>([]);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const initialPoints: Point[] = defaultPoints;
  const [points, setPoints] = useState<Point[]>(initialPoints);
  const [draggingPointIndex, setDraggingPointIndex] = useState<number | null>(
    null
  );
  const [showRealTimeFrequency, setShowRealTimeFrequency] =
    useState<boolean>(true);

  useEffect(() => {
    setupCanvas();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        draw(
          ctx,
          points,
          {
            drawFrequencyLabels,
            drawAllGaussianCurves,
            drawBezierCurve,
            drawAverageGaussianCurve,
            drawPoint,
            drawRealTimeFrequencyCurve,
          },
          analyserNodeRef,
          showRealTimeFrequency
        );
      }
    }
    updateFilterGains();
  }, [points, showRealTimeFrequency]);

  const setupCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        draw(
          ctx,
          points,
          {
            drawFrequencyLabels,
            drawAllGaussianCurves,
            drawBezierCurve,
            drawAverageGaussianCurve,
            drawPoint,
            drawRealTimeFrequencyCurve,
          },
          analyserNodeRef,
          showRealTimeFrequency
        );
      }
    }
  };

  const updateFilterGains = () => {
    const minFreq = 20; // 최소 주파수
    const maxFreq = 20000; // 최대 주파수

    filterNodesRef.current.forEach((filter, index) => {
      const freqStart = frequencies[index]; // 주파수 대역의 시작 주파수
      const freqEnd = frequencies[index + 1] || maxFreq; // 주파수 대역의 끝 주파수 (마지막 대역은 maxFreq 사용)

      // 로그 스케일로 주파수 변환
      const tStart =
        Math.log10(freqStart / minFreq) / Math.log10(maxFreq / minFreq);
      const tEnd =
        Math.log10(freqEnd / minFreq) / Math.log10(maxFreq / minFreq);

      // 캔버스 x 좌표에서의 시작과 끝
      const xStart = tStart * 800;
      const xEnd = tEnd * 800;

      let totalY = 0;
      let count = 0;

      for (let x = xStart; x <= xEnd; x += 1) {
        // 주어진 x 좌표에서의 y 값 계산
        const averageY = getAverageGaussianY(
          x,
          points,
          gaussianFunction,
          bezierFunction
        );
        totalY += averageY; // y 값 누적
        count++;
      }

      // 평균 y 값 계산
      const averageY = count > 0 ? totalY / count : 300;

      // 필터의 중심 주파수
      filter.frequency.value = frequencies[index]; // 필터에 주파수 설정

      // 필터의 gain 값 계산
      const gain = (300 - averageY) / 10;
      filter.gain.value = Math.max(-10, Math.min(10, gain)); // gain 값을 -10과 10 사이로 제한
    });
  };

  const handleMouseDown = (event: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const pointIndex = points.findIndex(
        (point) => Math.hypot(point.x - x, point.y - y) < 10
      );
      if (pointIndex !== -1) {
        setDraggingPointIndex(pointIndex);
      }
    }
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (draggingPointIndex !== null) {
      const canvas = canvasRef.current;
      if (canvas) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const newPoints = points.slice();
        newPoints[draggingPointIndex] = { x, y };
        setPoints(newPoints);
      }
    }
  };

  const handleMouseUp = () => {
    setTimeout(() => {
      setDraggingPointIndex(null);
    }, 100);
  };

  const handleMouseLeave = () => {
    setTimeout(() => {
      setDraggingPointIndex(null);
    }, 100);
  };

  const handleAudioPlay = () => {
    if (!audioContextRef.current) {
      setupAudioNodes(
        audioContextRef,
        sourceNodeRef,
        analyserNodeRef,
        filterNodesRef,
        audioElementRef,
        frequencies
      );
    }
    audioElementRef.current?.play();
  };

  const toggleRealTimeFrequency = () => {
    setShowRealTimeFrequency((prev) => !prev);
  };

  return (
    <div
      style={{
        backgroundColor: '#282c34',
        padding: '20px',
        borderRadius: '10px',
        width: '860px',
        margin: '0 auto',
        color: 'white',
      }}
    >
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        width={800}
        height={600}
        style={{
          border: '1px solid #61dafb',
          borderRadius: '10px',
          backgroundColor: '#1e1e1e',
        }}
      />
      <audio
        id="my-audio"
        controls
        ref={audioElementRef}
        onPlay={handleAudioPlay}
        style={{ width: '100%', marginTop: '10px', borderRadius: '5px' }}
      ></audio>
      <input
        type="file"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file && audioElementRef.current) {
            if ('src' in audioElementRef.current) {
              audioElementRef.current.src = URL.createObjectURL(file);
            }
            if ('load' in audioElementRef.current) {
              audioElementRef.current.load();
            }
            setupAudioNodes(
              audioContextRef,
              sourceNodeRef,
              analyserNodeRef,
              filterNodesRef,
              audioElementRef,
              frequencies
            );
          }
        }}
        style={{
          display: 'block',
          margin: '10px auto',
          padding: '10px 20px',
          borderRadius: '5px',
          backgroundColor: '#61dafb',
          color: 'black',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'center',
        }}
      />
      <button
        onClick={toggleRealTimeFrequency}
        style={{
          display: 'block',
          margin: '10px auto',
          padding: '10px 20px',
          borderRadius: '5px',
          backgroundColor: '#61dafb',
          color: 'black',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'center',
        }}
      >
        {showRealTimeFrequency
          ? 'Hide Real-Time Frequency'
          : 'Show Real-Time Frequency'}
      </button>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '800px',
          margin: '20px auto 0',
        }}
      >
        {frequencies.map((freq) => (
          <span key={freq} style={{ color: 'white' }}>
            {freq}
          </span>
        ))}
      </div>
    </div>
  );
};

export default StoryBook;
