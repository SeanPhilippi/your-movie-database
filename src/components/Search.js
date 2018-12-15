import React from 'react';

class Search extends React.Component {

  state = {
    searchText: '',
    apiUrl: 'http://www.omdbapi.com/?',
    apiKey: 'd5d74a24&',
    results: []
  }

  handleSearch = () => {
    const { searchText, apiUrl, apiKey } = this.state;
    fetch(`${apiUrl}s=${searchText}apikey=${apiKey}`)
      .then(res => res.json())
      .then(res => this.setState({ results: res.Search }))
      .catch(err => console.error(err));
  }

  onTextChange = e => {
    this.setState({ searchText: e.target.value });
  }

  onKeyUp = e => {
    if (e.key === 'Enter') {
      this.handleSearch();
    }
  }

  render() {
    return (
      <div className="Search">
        <input
          type="text"
          value="ADD A FILM..."
        // search={this.handleSearch}
        />
      </div>
    )
  }
}

export default Search;