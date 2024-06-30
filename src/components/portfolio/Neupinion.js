import React, { useState } from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Popup from '../Popup';

const PortfolioItemWrapper = styled.div`
  width: calc(50% - 20px);
  margin-bottom: 20px;
  transition: transform 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
  }
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

const PopupTitle = styled.h2`
  margin-top: 0;
`;

const PopupDescription = styled.div`
  margin: 20px 0;
  color: ${({ theme }) => theme.color.gray6};
  line-height: 1.5;

  h3 {
    margin: 10px 0;
  }

  h4 {
    margin: 10px 0;
  }

  img {
    width: 50%;
    align-self: center;
    max-width: 50%;
    height: auto;
    border-radius: 8px;
  }
`;

const CloseButton = styled.button`
  background-color: ${({ theme }) => theme.color.gray1};
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 4px;
  margin-top: 20px;
`;

const Neupinion = () => {
  const [isVisible, setIsVisible] = useState(false);

  const item = {
    title: '청소년 대상',
    description:
      '뉴피니언은 다양한 관점으로 하나의 사건을 바라보는 뉴스 미디어 플랫폼입니다.',
    details: `
# Neupinion
- 뉴피니언은 다양한 관점으로 하나의 사건을 바라보는 뉴스 미디어 플랫폼입니다.

## 🥳 서비스 소개
![서비스 소개](https://github.com/Neupinion/Neupinion-App/assets/71542970/d23377c2-b62c-4b76-ab2f-12c990096e21)

---

### 👥 모든 입장을 정리해서 알려줍니다!

#### 🔥재가공 이슈 제공
![재가공 이슈 제공](https://github.com/Neupinion/Neupinion-App/assets/71542970/1479373f-79e2-444e-8f83-f75d9418d568)

---

### 🌘 사용자 참여 서비스

#### 🔥의견 작성
![의견 작성](https://github.com/Neupinion/Neupinion-App/assets/71542970/af0b1a68-3d21-4dc7-aa7d-e1c7163d5c44)

#### 🔥입장 투표
![입장 투표](https://github.com/Neupinion/Neupinion-App/assets/71542970/1d7fcce9-a8b9-48df-999d-b33c704d41bf)

---

## 📚 프론트엔드 기술 스택
- Neupinion은 React Native와 Expo를 사용하여 크로스 플랫폼 개발의 효율성을 극대화하고, 빠르고 간편한 개발 환경을 통해 사용자에게 일관된 고성능의 네이티브 경험을 제공하기 위해 설계되었습니다.

![프론트엔드 기술 스택](https://github.com/Neupinion/Neupinion-App/assets/71542970/6047c2c0-b8bc-4a31-8b41-6211ca3ec534)

---

## 📱 어플 시행 방법
- ios, android studio 모두 아직 앱스토어, 플레이스토어에 등록 되지 않은 프로젝트이며, 현재 프로토타입 개발 진행중입니다.

---
    `,
  };

  return (
    <>
      <PortfolioItemWrapper onClick={() => setIsVisible(true)}>
        <JobTitle>{item.title}</JobTitle>
        <JobDetails>{item.description}</JobDetails>
      </PortfolioItemWrapper>

      <Popup isVisible={isVisible} onClose={() => setIsVisible(false)}>
        <PopupTitle>{item.title}</PopupTitle>
        <PopupDescription>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {item.details}
          </ReactMarkdown>
        </PopupDescription>
        <CloseButton onClick={() => setIsVisible(false)}>닫기</CloseButton>
      </Popup>
    </>
  );
};

export default Neupinion;
