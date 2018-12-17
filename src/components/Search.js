import React from 'react';

class Search extends React.Component {

  state = {
    searchText: '',
    apiUrl: 'http://www.omdbapi.com/?',
    apiKey: 'd5d74a24&',
    rows: [],
    results: []
  }

  inputStyle = {
    fontSize: 22,
    display: 'block',
    paddingLeft: 16,
    margin: 'auto',
    marginTop: 20,
    width: '42%'
  }

  handleSearch = () => {
    const { searchText, apiUrl, apiKey } = this.state;
    fetch(`${apiUrl}s=${searchText}&apikey=${apiKey}`)
      .then(res => res.json())
      .then(res => this.setState({ results: res.Search }))
      .catch(err => console.error(err));
    this.renderResults();
  }

  onTextChange = e => {
    this.setState({ searchText: e.target.value });
  }

  onKeyUp = e => {
    if (e.key === 'Enter') {
      this.handleSearch();
    }
  }

  renderResults = () => {
    const movieRows = this.state.results.map(movie => {
      return (
        <p key={movie.imdbID}>
          {movie.Title} ({movie.Year})
        </p>
      )
    })
    this.state = { results: movieRows };
    console.log('results2', this.state.results);
  }

  render() {
    // if (this.state.results) {
    //   resultsContent = this.state.results;
    //   console.log('results content', resultsContent)
    // } else {
    //   resultsContent = null;
    // }

    return (
      <div className="Search">
        <input
          type="text"
          placeholder="Add a film..."
          style={this.inputStyle}
          value={this.state.searchText}
          onChange={this.onTextChange}
          onKeyUp={this.onKeyUp}
        />
        <div>
          {this.renderResults}
        </div>
      </div>
    )
  }
}

export default Search;