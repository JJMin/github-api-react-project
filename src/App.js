import React, { Component } from 'react';
import GitHubReposSection from './components/GitHubReposSection';
import GlobalStyle from './components/GlobalStyle';
import NavBar from './components/NavBar';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1150px;
  margin: 0 auto;
`;

class App extends Component {
  render() {
    return (
      <Container>
        <GlobalStyle />
        <NavBar />
        <GitHubReposSection />
      </Container>
    );
  }
}

export default App;
