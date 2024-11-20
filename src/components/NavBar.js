import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Nav = styled.nav`
  position: fixed;
  bottom: ${({ isVisible }) => (isVisible ? '50px' : '-100px')};
  width: 600px;
  background-color: ${({ theme }) => theme.color.gray1};
  padding: 10px 20px;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-around;
  border-radius: 100px;
  z-index: 1000;
  transition: bottom 0.4s ease;

  a {
    color: ${({ theme }) => theme.color.gray6};
    text-decoration: none;
    padding: 10px 15px;
    transition:
      background-color 0.3s ease,
      border-radius 0.3s ease;
    border-radius: 100px;

    &:hover {
      background-color: ${({ theme }) => theme.color.secondary};
    }
  }
`;

const ArrowButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  position: fixed;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%)
    ${({ isVisible }) => (isVisible ? 'rotate(0deg)' : 'rotate(180deg)')};
  z-index: 1001;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
`;

const ArrowIcon = styled.svg`
  width: 24px;
  height: 24px;
  fill: #4a4a4a; /* 더 진한 회색으로 변경 */
`;

// eslint-disable-next-line react/prop-types
const NavBar = ({ isVisible, onClose }) => {
  return (
    <>
      <Nav isVisible={isVisible}>
        <Link to="/">Home</Link>
        <Link to="/portfolio">Experience</Link>
        <Link to="/blog">Write</Link>
      </Nav>
      <ArrowButton isVisible={isVisible} onClick={onClose}>
        <ArrowIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="m12 17.586-7.293-7.293-1.414 1.414L12 20.414l8.707-8.707-1.414-1.414L12 17.586z" />
          <path d="m20.707 5.707-1.414-1.414L12 11.586 4.707 4.293 3.293 5.707 12 14.414l8.707-8.707z" />
        </ArrowIcon>
      </ArrowButton>
    </>
  );
};

export default NavBar;
