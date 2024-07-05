import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Route, Routes, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import theme from './shared/theme';
import Main from './components/Main';
import Footer from './components/Footer';
import Header from './components/Header';
import StoryBook from './components/StoryBook';
import Portfolio from './components/Portfolio';
import Blog from './components/Blog';

const Container = styled.div`
  background-color: ${({ theme }) => theme.color.backSub};
  padding: 0 20px;
  color: ${({ theme }) => theme.color.black};
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  margin: 0 auto;
  overflow: hidden;

  .page-enter {
    opacity: 0;
    transform: translateX(100%);
  }
  .page-enter-active {
    opacity: 1;
    transform: translateX(0);
    transition:
      opacity 350ms ease,
      transform 350ms ease;
  }
  .page-exit {
    opacity: 1;
    transform: translateX(0);
  }
  .page-exit-active {
    opacity: 0;
    transform: translateX(-100%);
    transition:
      opacity 350ms ease,
      transform 350ms ease;
  }
`;

const PageWrapper = styled.div`
  width: 100%;
`;

function App() {
  const location = useLocation();

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Container>
        <TransitionGroup>
          <CSSTransition key={location.key} classNames="page" timeout={350}>
            <PageWrapper>
              <Routes location={location}>
                <Route path="/" element={<Main />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/storybook" element={<StoryBook />} />
                <Route path="/blog" element={<Blog />} />
              </Routes>
            </PageWrapper>
          </CSSTransition>
        </TransitionGroup>
      </Container>
      <Footer />
    </ThemeProvider>
  );
}

export default App;