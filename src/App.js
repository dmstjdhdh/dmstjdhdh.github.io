import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import theme from './shared/theme';
import Main from './components/Main';
import Footer from './components/Footer';

const Container = styled.div`
  background-color: ${({ theme }) => theme.color.backSub};
  padding: 0 20px;
  color: ${({ theme }) => theme.color.black};
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  max-width: 800px;
  margin: 0 auto;
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Main />
        <Footer />
      </Container>
    </ThemeProvider>
  );
}

export default App;
