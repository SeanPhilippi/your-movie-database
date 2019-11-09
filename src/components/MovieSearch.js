import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import SearchResult from './SearchResult';
import debounce from '../utils/helpers/debounce.js';

class MovieSearch extends PureComponent {
  state = {
    searchText: '',
    searchResults: [],
    allowResults: true,
  };

  renderResults = () => {
    const { searchResults } = this.state;
    const { users } = this.props;
    if (searchResults) {
      return (
        users
        ? <div className="bg-white movie-result-scroll">
            { users.map(user => <SearchResult user={ user } key={ user._id } />) }
          </div>
        : <div className="bg-white movie-result-scroll">
            { searchResults.map(movie => <SearchResult movie={ movie } handleAdd={ this.handleAdd } key={ movie.id } />) }
          </div>
      )
    };
  };
  // ! this is working, but need a timeout to also clear results if user pauses when typing
  // this way results don't continue to concatenate to results array
  // also maybe completely refresh search results as more characters are entered since
  // a search should continuously filter out more as the input query value length increases
  onKeyUp = e => {
    if (e.key === 'Backspace') {
      this.clearResults();
      this.handleDelay();
    };
  };

  handleMovie = () => {
    this.clearResults();
    const pageNums = [1, 2, 3];
    const { searchText } = this.state;
    pageNums.forEach(num => {
      axios(`/api/movies/search/${ searchText }/${ num }`)
        .then(({ data }) => {
          console.log('search data', data);
          if (data.Search) {
            this.setState(prevState => ({ searchResults: [...data.Search, ...prevState.searchResults] }));
          };
        })
        .catch(console.log);
      });
  };

  handleSearch = () => {
    this.clearResults();
    const pageNums = [1, 2, 3];
    const { searchText } = this.state;
    pageNums.forEach(num => {
      axios(`/api/movies/search/${ searchText }/${ num }`)
        .then(({ data }) => {
          console.log('search data', data);
          if (data.Search) {
            this.setState(prevState => ({ searchResults: [...data.Search, ...prevState.searchResults] }));
          };
        })
        .catch(console.log);
      });
  };

  handleDelay = debounce(this.handleSearch, 300);

  // handleFocus = (bool, time = 0) => {
  //   setTimeout(() => {
  //     this.setState({ allowResults: bool });
  //   }, time);
  // };

  onTextChange = e => {
    this.setState({ searchText: e.target.value });
    // ! temp solution, prob not ideal, look up best practices
    if (this.state.searchText && this.state.searchText.length > 1) {
      // fire handle search through debounce function to reduce api calls with delay
      this.handleDelay();
    };
  };

  clearResults = () => {
    this.setState(() => ({ searchResults: [] }));
  };

  clearSearchText = () => {
    this.setState(() => ({ searchText: '' }));
  };

  render() {
    const { marginTopVal, users, itemsCount } = this.props;
    const { searchText, allowResults } = this.state;

    return (
      <div className={`${ itemsCount > 19 ? 'd-none' : 'd-flex' } flex-column movie-search-container align-items-center mt-${ marginTopVal }`}>
        <input
          autoComplete="off"
          autoFocus
          name="searchText"
          className="movie-search-text pl-3 w-100"
          placeholder={ !users ? "Search for films..." : "Type a member's name..." }
          value={ searchText }
          onChange={ this.onTextChange }
          onKeyUp={ this.onKeyUp }
          // onFocus={ () => this.handleFocus(true) }
          // onBlur={ () => this.handleFocus(false, 200) }
        >
        </input>
        { allowResults && this.renderResults() }
      </div>
    )
  }
};

MovieSearch.propTypes = {

};

export default MovieSearch;