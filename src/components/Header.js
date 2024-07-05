import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  width: 100%;
  padding: 20px 100px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ececec;
`;

const Nav = styled.nav`
  display: flex;
  gap: 40px;

  a {
    text-decoration: none;
    color: black;
    font-weight: bold;
    &:hover {
      color: mediumturquoise;
    }

    &.active {
      color: mediumturquoise;
    }
  }
`;

function Header() {
  const location = useLocation();

  return (
    <>
      <HeaderContainer>
        <Nav>
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
            소개
          </Link>
          <Link
            to="/portfolio"
            className={location.pathname === '/portfolio' ? 'active' : ''}
          >
            포트폴리오
          </Link>
          <Link
            to="/storybook"
            className={location.pathname === '/storybook' ? 'active' : ''}
          >
            StoryBook
          </Link>
          <Link
            to="/blog"
            className={location.pathname === '/blog' ? 'active' : ''}
          >
            블로그
          </Link>
        </Nav>
      </HeaderContainer>
    </>
  );
}

export default Header;
