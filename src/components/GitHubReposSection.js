import React, { Fragment } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import fetchGitHubRepos from '../api/api';
import { MdStar } from 'react-icons/md';
import Fetching from './Fetching';

const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 40px 0 15px 0;
  li {
    margin: 8px 0;
  }
`;

const Button = styled.button`
  border: none;
  background: transparent;
  font-size: 1.8rem;
  text-decoration: none;
  font-weight: 300;
  margin: 0 10px;
  color: inherit;
  outline: 0;
  border: none;

  &:hover {
    cursor: pointer;
  }
`;

const RepoCardsContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin: 0 auto;

  .card {
    margin: 13px 0;
    padding: 20px;
    border-radius: 4px;
    text-align: center;
  }
  .cardCount {
    font-size: 2.2rem;
    font-weight: 300;
    margin: 9px;
  }
  .cardImage {
    width: 150px;
    border-radius: 50%;
  }
  .cardRepoName {
    font-size: 2rem;
    margin: 13px 0 9px 0;
    a {
      text-decoration: none;
      color: #916dd5;
    }
  }
  .cardInfo li {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 6px 0;
    font-size: 1.6rem;
    font-weight: 300;
    color: #916dd5;

    svg {
      margin-top: -2px;
      font-size: 2.1rem;
    }
  }
  li.cardUserName {
    color: #6f5a7e;
  }
`;

function LanguageBar({ selectedTab, onTabSelect }) {
  const languageTabs = [
    'All',
    'JavaScript',
    'Python',
    'Ruby',
    'Java',
    'PHP',
    'TypeScript',
    'CSS'
  ];

  return (
    <List>
      {languageTabs.map((language) => (
        <li key={language}>
          <Button
            onClick={() => onTabSelect(language)}
            style={
              language === selectedTab
                ? {
                    color: '#916dd5',
                    borderBottom: '1.3px solid #916dd5',
                    fontWeight: 400
                  }
                : null
            }
          >
            {language}
          </Button>
        </li>
      ))}
    </List>
  );
}

LanguageBar.propTypes = {
  onTabSelect: PropTypes.func.isRequired,
  selectedTab: PropTypes.string.isRequired
};

const GibHubReposCards = ({ gitHubRepos }) => {
  return (
    <RepoCardsContainer>
      {gitHubRepos.map((gitHubRepo, index) => {
        const { name, owner, html_url, stargazers_count } = gitHubRepo;
        const { login, avatar_url } = owner;

        return (
          <li className="card" key={html_url}>
            <h4 className="cardCount">#{index + 1}</h4>
            <img
              className="cardImage"
              src={avatar_url}
              alt={`${login}'s avatar`}
            ></img>
            <h2 className="cardRepoName">
              <a href={html_url}>{name}</a>
            </h2>
            <ul className="cardInfo">
              <li className="cardUserName">@{login}</li>
              <li>
                <MdStar />
                {stargazers_count.toLocaleString()} stars
              </li>
            </ul>
          </li>
        );
      })}
    </RepoCardsContainer>
  );
};

GibHubReposCards.propType = {
  gitHubRepos: PropTypes.array.isRequired
};

const selectedTabReducer = (state, action) => {
  if (action.type === 'Successful') {
    return {
      ...state,
      [action.selectedTab]: action.data,
      error: null
    };
  } else if (action.type === 'Error') {
    return {
      ...state,
      error: action.error.message
    };
  } else {
    throw new Error('Action is not supported.');
  }
};

const GitHubReposSection = () => {
  const [selectedTab, setSelectedTab] = React.useState('All');
  const [state, dispatch] = React.useReducer(selectedTabReducer, {
    error: null
  });

  const fetchedGitHubRepos = React.useRef([]);

  React.useEffect(() => {
    if (fetchedGitHubRepos.current.includes(selectedTab) === false) {
      fetchedGitHubRepos.current.push(selectedTab);
      fetchGitHubRepos(selectedTab)
        .then((data) => {
          dispatch({ type: 'Successful', selectedTab, data });
        })
        .catch((error) => dispatch({ type: 'Error', error }));
    }
  }, [fetchedGitHubRepos, selectedTab]);

  const loadingGitHubRepos = () => !state[selectedTab] && state.error === null;

  return (
    <Fragment>
      <LanguageBar selectedTab={selectedTab} onTabSelect={setSelectedTab} />
      {loadingGitHubRepos() && <Fetching />}
      {state.error && <p>{state.error}</p>}
      {state[selectedTab] && (
        <GibHubReposCards gitHubRepos={state[selectedTab]} />
      )}
    </Fragment>
  );
};

export default GitHubReposSection;
