import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Search.css';
import debounce from './debounce.js';
import {
  addToList,
} from '../../redux/actions';

class Search extends React.PureComponent {

  state = {
    searchText: '',
    searchResults: [],
  }

  renderResults = () => {
    const { searchResults } = this.state;
    if (searchResults) {
      return searchResults.map(movie =>
        <div
          key={movie.imdbId}
          className="result-item"
          onClick={() => this.handleAdd(movie)}
        >
          {/* <MovieResult movie={movie} /> */}
          <div className="result-info">
            <div style={{ fontSize: "15px" }}>
              {movie.Title} ({movie.Year})
            </div>
          </div>
        </div>
      )
    }
  }

  // TODO: search - add pagination
  handleSearch = () => {
    const { searchText } = this.state;
    fetch(`api/movies/search/${searchText}`)
    .then(res => res.json())
    .then(data => {
      this.setState(() => ({searchResults: data.Search}))
    })
    .catch(err => console.log(err));
  }

  handleDelay = debounce(this.handleSearch, 300);

  onTextChange = e => {
    this.setState({searchText: e.target.value});
    // fire handle search through debounce function to reduce api calls with delay
    this.handleDelay();
  }

  handleAdd = movie => {
    const { addToList } = this.props;
    // fetch call to grab movie from api by id, then grab director
    fetch(`/api/movies/addMovie/${movie.imdbID}`)
      .then(res => res.json())
      .then(data => {
        addToList({
          name: movie.Title,
          year: movie.Year,
          director: data.Director,
          id: data.imdbID,
          runtime: data.Runtime,
          country: data.Country,
          plot: data.Plot,
          language: data.Language
        });
        this.clearResults();
        this.clearSearchText();
      });
  }

  clearResults = () => {
    this.setState(() => ({searchResults: []}));
  }

  clearSearchText = () => {
    this.setState(() => ({searchText: ''}));
  }

  // onKeyUp = e => {
  //   if (e.key === 'Enter') {
  //     // TODO: add more pages later when scroll container is integrated
  //     const arr = [1, 2];
  //     arr.map(num => {
  //       return this.handleSearch(num);
  //     })
  //   }
  // }

  render() {

    return (
      <div className="search">
        <input
          name="searchText"
          className="search-text"
          placeholder="  Search for films..."
          value={this.state.searchText}
          onChange={this.onTextChange}
          onKeyUp={this.onKeyUp}
          style={{width: '32rem'}}
        >
        </input>
        <div>
          {this.renderResults()}
        </div>
      </div>
    )
  }
}

Search.propTypes = {
  list: PropTypes.array.isRequired,
  addToList: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => ({
  addToList: movie => dispatch(addToList(movie)),
});

export default connect(null, mapDispatchToProps)(Search);