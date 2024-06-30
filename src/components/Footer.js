import React from 'react';
import styled from 'styled-components';
import { FaGithub } from 'react-icons/fa';

const SiteFooter = styled.footer`
  width: 100%;
  text-align: center;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.color.gray1};
  border-top: 1px solid ${({ theme }) => theme.color.gray3};
`;

const FooterText = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.color.gray6};
`;

const FooterIconLink = styled.a`
  color: ${({ theme }) => theme.color.black};
  margin-top: 10px;
  font-size: 1.5rem;

  &:hover {
    color: ${({ theme }) => theme.color.sub};
  }
`;

const Footer = () => {
  return (
    <SiteFooter>
      <FooterIconLink
        href="https://github.com/dmstjdhdh"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaGithub />
      </FooterIconLink>
      <FooterText>
        연락처: dmstjdhdh@cau.ac.kr | 디스코드: subin#3808
      </FooterText>
    </SiteFooter>
  );
};

export default Footer;
