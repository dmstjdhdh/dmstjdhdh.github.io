import React from 'react';
import styled from 'styled-components';
import Scene from './componenets/Scene';

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

function App() {
  return (
    <CenteredContainer>
      <Scene />
    </CenteredContainer>
  );
}

export default App;
