import React, { Component } from 'react';

interface SearchProps {
  onSearchSubmit: (term: string) => void;
}

interface SearchState {
  term: string;
}

class Search extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      term: '',
    };
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ term: event.target.value });
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.props.onSearchSubmit(this.state.term);
  };

  render() {
    return (
      <div className="search-bar">
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.term}
            onChange={this.handleInputChange}
            placeholder="Search for a Pokémon..."
          />
          <button type="submit">Search</button>
        </form>
      </div>
    );
  }
}

export default Search;
