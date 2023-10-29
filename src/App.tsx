import React, { Component } from 'react';
import Search from './components/Search';
import Results from './components/Results';
import ErrorBoundary from './components/ErrorBoundary';

interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

interface PokemonData {
  name: string;
  base_experience: number;
  height: number;
  id: number;
  order: number;
  weight: number;
  abilities: PokemonAbility[];
}

interface AppState {
  data: PokemonData | null;
  isLoading: boolean;
}

class App extends Component<Record<string, never>, AppState> {
  state: AppState = {
    data: null,
    isLoading: true,
  };

  handleSearchSubmit = (term: string) => {
    this.setState({ isLoading: true });

    fetch(`https://pokeapi.co/api/v2/pokemon/${term}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        this.setState({
          data: data,
          isLoading: false,
        });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        this.setState({ isLoading: false });
      });
  };

  render() {
    const { data, isLoading } = this.state;

    const items = data
      ? [
          {
            name: data.name,
            description: `Experience: ${data.base_experience}, Height: ${data.height}, Weight: ${data.weight}`,
          },
        ]
      : [];

    return (
      <div className="main-content">
        <ErrorBoundary>
          <div className="search-section">
            <Search onSearchSubmit={this.handleSearchSubmit} />
          </div>
          <div className="results-section">
            {isLoading ? <div>Loading...</div> : <Results items={items} />}
          </div>
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;
