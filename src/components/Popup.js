import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOutDown = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(20px);
  }
`;

const PopupOverlay = styled.div`
  display: ${({ isVisible }) => (isVisible ? 'flex' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const PopupContent = styled.div`
  background-color: #fff;
  padding: 30px;
  border-radius: 12px;
  max-width: 900px;
  width: 90%;
  max-height: 90%;
  overflow-y: auto;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  animation: ${({ isVisible }) => (isVisible ? fadeInUp : fadeOutDown)} 0.5s
    ease-in-out;
  transition:
    opacity 0.5s ease-in-out,
    transform 0.5s ease-in-out;
`;

const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  color: #333;
  font-size: 1.5rem;
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 1001;
`;

// eslint-disable-next-line react/prop-types
const Popup = ({ isVisible, onClose, children }) => {
  const [showPopup, setShowPopup] = useState(isVisible);

  useEffect(() => {
    if (isVisible) {
      setShowPopup(true);
    } else {
      const timer = setTimeout(() => setShowPopup(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  return (
    <PopupOverlay isVisible={showPopup} onClick={onClose}>
      <PopupContent isVisible={isVisible} onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        {children}
      </PopupContent>
    </PopupOverlay>
  );
};

export default Popup;
