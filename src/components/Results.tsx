import React, { Component } from 'react';

interface Result {
  name: string;
  description: string;
}

interface ResultsProps {
  items: Result[];
}

class Results extends Component<ResultsProps> {
  render() {
    return (
      <div className="results">
        {this.props.items.length === 0 ? (
          <p>No results found.</p>
        ) : (
          <ul>
            {this.props.items.map((item, index) => (
              <li key={index}>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default Results;
