import React, { PureComponent, createRef } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import SearchResult from './SearchResult';
import { connect } from 'react-redux';
import debounce from '../utils/helpers/debounce.js';
import { addToList } from '../redux/actions';

class Search extends PureComponent {
  state = {
    searchText: '',
    searchResults: [],
    allowResults: false,
  };

  focusInput = createRef();
  handleAdd = movie => {
    const { addToList } = this.props;
    const remappedMovie = {
      title: movie.Title,
      year: movie.Year,
      id: movie.imdbID
    };
    addToList(remappedMovie)
      .then(added => {
        if (added && this.focusInput.current) {
          this.focusInput.current.focus();
        };
        this.clearResults();
        this.clearSearchText();
      });
  };

  renderResults = () => {
    const { searchResults } = this.state;
    const { users } = this.props;
    if (searchResults) {
      return (
        users
        ? <div className="bg-white result-scroll">
            { users.map(user => <SearchResult user={ user } key={ user._id } />) }
          </div>
        : <div className="bg-white result-scroll">
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

  handleSearch = () => {
    this.clearResults();
    const pageNums = [1, 2, 3];
    const { searchText } = this.state;
    pageNums.forEach(num => {
      axios(`/api/movies/search/${ searchText }/${ num }`)
        .then(({ data }) => {
          if (data.Search) {
            this.setState(prevState => ({ searchResults: [...data.Search, ...prevState.searchResults] }));
          };
        })
        .catch(console.log);
      });
  };

  handleDelay = debounce(this.handleSearch, 300);

  handleFocus = (bool, time = 0) => {
    setTimeout(() => {
      this.setState({ allowResults: bool });
    }, time);
  };

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
      <div className={`${ itemsCount > 19 ? 'd-none' : 'd-flex' } flex-column align-items-center mt-${ marginTopVal }`}>
        <input
          ref={ this.focusInput }
          autoComplete="off"
          autoFocus
          name="searchText"
          className="search-input pl-3 w-100"
          placeholder={ !users ? "Search for films..." : "Type a member's name..." }
          value={ searchText }
          onChange={ this.onTextChange }
          onKeyUp={ this.onKeyUp }
          onFocus={ () => this.handleFocus(true) }
          onBlur={ () => this.handleFocus(false, 200) }
        >
        </input>
        { allowResults && this.renderResults() }
      </div>
    )
  }
};

Search.propTypes = {
  addToList: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  addToList: (movie, post) => dispatch(addToList(movie, post)),
});

export default connect(null, mapDispatchToProps)(Search);