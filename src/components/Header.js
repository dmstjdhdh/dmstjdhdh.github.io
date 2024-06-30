import React from 'react';
import styled from 'styled-components';

const SiteHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.color.gray1};
  border-bottom: 1px solid ${({ theme }) => theme.color.gray3};
`;

const NavButton = styled.button`
  background-color: transparent;
  border: none;
  color: ${({ theme }) => theme.color.black};
  font-size: 1rem;
  cursor: pointer;
  margin: 0 10px;

  &:hover {
    color: ${({ theme }) => theme.color.main};
  }
`;

const Header = () => {
  return (
    <SiteHeader>
      <div>
        <NavButton>Portfolio</NavButton>
        <NavButton>My Log</NavButton>
      </div>
    </SiteHeader>
  );
};

export default Header;
