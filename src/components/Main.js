import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const Content = styled.div`
  flex: 1;
  max-width: 800px;
  margin-top: 60px;
`;

const ProfileHeader = styled.header`
  display: flex;
  align-items: center;
  text-align: left;
  margin-bottom: 20px;
  width: 100%;
  gap: 25px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin: 10px 0;
  color: ${({ theme }) => theme.color.black};
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  margin: 10px 0;
  width: 100%;
  color: ${({ theme }) => theme.color.gray6};
  letter-spacing: 0.02rem;
  line-height: 1.5;
`;

const Section = styled.section`
  width: 100%;
  max-width: 800px;
  margin-top: 30px;
  margin-bottom: 30px;
  opacity: 0;
  transition: opacity 1s ease-in-out;
  &.visible {
    opacity: 1;
  }
`;

const Job = styled.div`
  margin: 20px 0;
  padding: 20px;
  background-color: ${({ theme }) => theme.color.gray1};
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const JobTitle = styled.h3`
  font-size: 1.5rem;
  margin-top: 5px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.color.black};
`;

const JobDetails = styled.p`
  font-size: 1rem;
  margin: 8px 0;
  color: ${({ theme }) => theme.color.gray6};
  line-height: 1.5;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin: 0 20px 20px;

  img {
    height: 40px;
  }
`;

const Main = () => {
  const sectionsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          } else {
            entry.target.classList.remove('visible');
          }
        });
      },
      { threshold: 0.1 },
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      if (sectionsRef.current) {
        sectionsRef.current.forEach((section) => {
          if (section) observer.unobserve(section);
        });
      }
    };
  }, []);

  return (
    <Content>
      <ProfileHeader>
        <div>
          <Title>김용우</Title>
          <Subtitle>
            중앙대학교 소프트웨어학부 3학년 과정으로 재학중이며, 다양한 역할을
            해내는 사람들과 소통하는 것을 좋아하며, 아름다운 인터페이스를
            구현하는 데에 흥미를 가지고 있습니다. 사용자 경험 개선이, 비용
            절감으로 이어지는 경험을 멋있다고 생각을 가지고 있습니다.
          </Subtitle>
        </div>
      </ProfileHeader>
      <Section ref={(el) => (sectionsRef.current[0] = el)}>
        <h2>학력</h2>
        <Job>
          <JobTitle>중앙대학교 소프트웨어학부</JobTitle>
          <JobDetails>총 학점 평균: 3.68</JobDetails>
          <JobDetails>총 이수 학점: 97 </JobDetails>
          <JobDetails>재학 기간: 2020 - 2025</JobDetails>
        </Job>
      </Section>
      <Section ref={(el) => (sectionsRef.current[1] = el)}>
        <h2>경력</h2>
        <Job>
          <JobTitle>클라이언트 개발자</JobTitle>
          <JobDetails>주식회사 스윙크</JobDetails>
          <JobDetails>2022 - 2023년 11월</JobDetails>
          <JobDetails>
            게임엔진 CocosCreator와 TypeScript 언어로 WebGL 환경에서 실행 가능한
            교육게임 어플리케이션을 주로 개발하였습니다.
          </JobDetails>
        </Job>
      </Section>
      <Section ref={(el) => (sectionsRef.current[2] = el)}>
        <h2>기술 스택</h2>
        <Job>
          <TechStack>
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
              alt="javascript logo"
            />
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"
              alt="typescript logo"
            />
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
              alt="react logo"
            />
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg"
              alt="bootstrap logo"
            />
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg"
              alt="css3 logo"
            />
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/d3js/d3js-original.svg"
              alt="d3 logo"
            />
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg"
              alt="figma logo"
            />
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg"
              alt="redux logo"
            />
          </TechStack>
          <JobDetails>
            TypeScript와 JavaScript를 사용하는 개발을 주로 해왔습니다.
          </JobDetails>
          <JobDetails>
            React 및 React Native 프로젝트를 2024년도부터 경험하고 있습니다.
          </JobDetails>
          <JobDetails>
            GitHub 협업 문화에 관심이 많으며, 소스코드를 효율적이게 개선하는
            환경을 추구하고 있습니다.
          </JobDetails>
        </Job>
      </Section>
      <Section ref={(el) => (sectionsRef.current[3] = el)}>
        <h2>수상 경력</h2>
        <Job>
          <JobDetails>2020 농식품 빅데이터 온라인 해커톤 최우수상</JobDetails>
          <JobDetails>2023 임팩트캠퍼스 IT서비스 공모전 최우수상</JobDetails>
          <JobDetails>2024 중앙대학교 캡스톤경진대회 본선 참가</JobDetails>
        </Job>
      </Section>
    </Content>
  );
};

export default Main;
