import React, { useEffect, useRef, useState } from 'react';

const mapValue = (value, inputMin, inputMax, outputMin, outputMax) => {
  return (
    ((value - inputMin) * (outputMax - outputMin)) / (inputMax - inputMin) +
    outputMin
  );
};

const frequencies = [25, 50, 100, 200, 500, 1000, 2000, 5000, 10000];

const StoryBook = () => {
  const canvasRef = useRef(null);
  const audioContextRef = useRef(null);
  const sourceNodeRef = useRef(null);
  const analyserNodeRef = useRef(null);
  const filterNodesRef = useRef([]);
  const audioElementRef = useRef(null);
  const initialPoints = [
    { x: 0, y: 300 },
    { x: 100, y: 300 },
    { x: 200, y: 300 },
    { x: 300, y: 300 },
    { x: 400, y: 300 },
    { x: 500, y: 300 },
    { x: 600, y: 300 },
    { x: 700, y: 300 },
    { x: 800, y: 300 },
  ];
  const [points, setPoints] = useState(initialPoints);
  const [draggingPointIndex, setDraggingPointIndex] = useState(null);

  useEffect(() => {
    setupCanvas();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        draw(ctx);
      }
    }
    updateFilterGains();
  }, [points]);

  const setupCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        draw(ctx);
      }
    }
  };

  const setupAudioNodes = () => {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioContext = new AudioContext();
    audioContextRef.current = audioContext;

    const audioElement = audioElementRef.current;
    const sourceNode = audioContext.createMediaElementSource(audioElement);
    sourceNodeRef.current = sourceNode;

    const analyserNode = audioContext.createAnalyser();
    analyserNode.fftSize = 2048;
    analyserNodeRef.current = analyserNode;

    const inputNode = audioContext.createGain();
    sourceNode.connect(inputNode);

    filterNodesRef.current = frequencies.map((frequency, index, array) => {
      const filterNode = audioContext.createBiquadFilter();
      filterNode.gain.value = 0;
      filterNode.frequency.setValueAtTime(frequency, audioContext.currentTime);

      if (index === 0) {
        filterNode.type = 'lowshelf';
      } else if (index === array.length - 1) {
        filterNode.type = 'highshelf';
      } else {
        filterNode.type = 'peaking';
      }
      return filterNode;
    });

    filterNodesRef.current.reduce((prev, current) => {
      prev.connect(current);
      return current;
    }, inputNode);

    const outputNode = audioContext.createGain();
    filterNodesRef.current[filterNodesRef.current.length - 1].connect(
      outputNode,
    );
    outputNode.connect(analyserNode);
    analyserNode.connect(audioContext.destination);

    sourceNode.connect(filterNodesRef.current[0]);
  };

  const gaussianFunction = (point, x, sigma = 50) => {
    return (
      (point.y - 300) *
        Math.exp(-Math.pow(x - point.x, 2) / (2 * Math.pow(sigma, 2))) +
      300
    );
  };

  const bezierFunction = (t, points) => {
    const controlPoint = {
      x: 400,
      y: 300 + 8 * (points[1].y - 300),
    }; // 가상의 점, 움직이는 정도를 8배 늘림
    const x =
      (1 - t) * (1 - t) * points[0].x +
      2 * (1 - t) * t * controlPoint.x +
      t * t * points[1].x;
    const y =
      (1 - t) * (1 - t) * points[0].y +
      2 * (1 - t) * t * controlPoint.y +
      t * t * points[1].y;
    return { x, y };
  };

  const updateFilterGains = () => {
    const minFreq = 20;
    const maxFreq = 20000;

    filterNodesRef.current.forEach((filter, index) => {
      const t = index / (filterNodesRef.current.length - 1);
      const x = t * 800;
      let y = 300;

      points.forEach((point) => {
        if (point.y !== 300) {
          y += gaussianFunction(point, x) - 300;
        }
      });

      const bezierPoint = bezierFunction(t, [
        points[0],
        points[points.length - 1],
      ]);
      if (bezierPoint.y !== 300) {
        y += (bezierPoint.y - 300) / 2; // Bezier 곡선의 값의 절반만 더하기
      }

      const frequency = mapValue(x, 0, 800, minFreq, maxFreq);
      filter.frequency.value = frequency;
      const gain = (300 - y) / 10;
      filter.gain.value = Math.max(-10, Math.min(10, gain));

      // 주파수와 gain 값을 콘솔에 출력
      console.log(
        `Frequency: ${frequency.toFixed(2)} Hz, Gain: ${gain.toFixed(2)} dB`,
      );
    });
  };

  const drawGaussianCurve = (ctx, point) => {
    ctx.beginPath();
    for (let t = 0; t <= 1; t += 0.01) {
      const x = t * 800;
      const y = gaussianFunction(point, x);
      if (t === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.strokeStyle = 'cyan';
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  const drawAllGaussianCurves = (ctx) => {
    points.forEach((point) => {
      if (point.y !== 300) {
        drawGaussianCurve(ctx, point);
      }
    });
  };

  const drawAverageGaussianCurve = (ctx) => {
    ctx.beginPath();
    for (let t = 0; t <= 1; t += 0.01) {
      const x = t * 800;
      let totalY = 0;
      let count = 0;

      points.forEach((point) => {
        if (point.y !== 300) {
          const gaussianY = gaussianFunction(point, x) - 300;
          totalY += gaussianY;
          count++;
        }
      });

      const bezierPoint = bezierFunction(t, [
        points[0],
        points[points.length - 1],
      ]);
      if (bezierPoint.y !== 300) {
        totalY += (bezierPoint.y - 300) / 2; // Bezier 곡선의 값의 절반만 더하기
        count++;
      }

      const averageY = 300 + (count > 0 ? totalY / count : 0);
      if (t === 0) {
        ctx.moveTo(x, averageY);
      } else {
        ctx.lineTo(x, averageY);
      }
    }
    ctx.strokeStyle = 'magenta';
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  const drawBezierCurve = (ctx, points) => {
    if (points.length !== 2) return;
    ctx.beginPath();
    ctx.moveTo(points[0].x - 800, points[0].y);
    const controlPoint = {
      x: 400,
      y: 300 + 8 * (points[1].y - 300),
    }; // 가상의 점, 움직이는 정도를 8배 늘림
    for (let t = 0; t <= 1; t += 0.01) {
      const x =
        (1 - t) * (1 - t) * (points[0].x - 800) +
        2 * (1 - t) * t * (controlPoint.x - 800) +
        t * t * points[1].x;
      const y =
        (1 - t) * (1 - t) * points[0].y +
        2 * (1 - t) * t * controlPoint.y +
        t * t * points[1].y;
      ctx.lineTo(x, y);
    }
    ctx.lineTo(points[1].x + 800, points[1].y); // 오른쪽으로 800 연장
    ctx.strokeStyle = 'yellow';
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  const drawPoint = (ctx, point, index) => {
    ctx.beginPath();
    ctx.arc(point.x, point.y, 10, 0, 2 * Math.PI);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.fillStyle = 'white';
    ctx.font = 'bold 12px Arial';
    ctx.fillText((index + 1).toString(), point.x - 4, point.y + 4);
  };

  const drawFrequencyLabels = (ctx) => {
    ctx.fillStyle = 'white';
    ctx.font = 'bold 12px Arial';
    const positions = [25, 50, 100, 200, 500, 1000, 2000, 5000, 10000];
    const xPositions = positions.map((freq) =>
      mapValue(Math.log10(freq), Math.log10(20), Math.log10(20000), 0, 800),
    );
    xPositions.forEach((x, index) => {
      ctx.fillText(`${positions[index]}`, x, 580);
    });
  };

  const drawFrequencyData = (ctx) => {
    if (!analyserNodeRef.current) return;

    const bufferLength = analyserNodeRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyserNodeRef.current.getByteFrequencyData(dataArray);

    const barWidth = (ctx.canvas.width / bufferLength) * 2.5;
    let barHeight;
    let x = 0;

    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    for (let i = 0; i < bufferLength; i++) {
      barHeight = (dataArray[i] / 256) * ctx.canvas.height;
      ctx.fillStyle = 'rgba(0, 128, 0, 0.6)';
      ctx.fillRect(x, ctx.canvas.height - barHeight, barWidth, barHeight);
      x += barWidth + 1;
    }
  };

  const draw = (ctx) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    drawFrequencyData(ctx);
    drawFrequencyLabels(ctx);
    drawAllGaussianCurves(ctx);
    drawBezierCurve(ctx, [points[0], points[points.length - 1]]);
    drawAverageGaussianCurve(ctx);
    points.forEach((point, index) => drawPoint(ctx, point, index));
    requestAnimationFrame(() => draw(ctx));
  };

  const handleMouseDown = (event) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const pointIndex = points.findIndex(
        (point) => Math.hypot(point.x - x, point.y - y) < 10,
      );
      if (pointIndex !== -1) {
        setDraggingPointIndex(pointIndex);
      }
    }
  };

  const handleMouseMove = (event) => {
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
      setupAudioNodes();
    }
    audioElementRef.current.play();
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
            setupAudioNodes();
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
