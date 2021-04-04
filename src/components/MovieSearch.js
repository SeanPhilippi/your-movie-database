import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import SearchResult from './SearchResult';
import {
  fetchMovie,
  fetchMovieStats,
  fetchMovieComments,
} from '../redux/actions';
import debounce from '../utils/helpers/debounce.js';

class MovieSearch extends PureComponent {
  state = {
    searchText: '',
    searchType: 'substring',
    searchResults: [],
    allowResults: true,
    inputColorChange: false,
  };

  onTextChange = async e => {
    await this.setState({ searchText: e.target.value });
    // ! temp solution, prob not ideal, look up best practices
    if (this.state.searchText && this.state.searchText.length) {
      if (this.state.searchText.length > 2) {
        await this.setState({ searchType: 'substring' });
      } else {
        await this.setState({ searchType: 'exact' });
      }
      // fire handle search through debounce function to reduce api calls with delay
      this.handleDelay();
    }
  };

  clearResults = () => {
    this.setState(() => ({ searchResults: [] }));
  };

  clearSearchText = () => {
    this.setState(() => ({ searchText: '' }));
  };

  clear = () => {
    this.clearSearchText();
    this.clearResults();
  };

  onKeyUp = e => {
    if (e.key === 'Backspace') {
      this.clearResults();
      if (this.state.searchText.length) {
        this.handleDelay();
      }
    }
  };

  handleSearch = () => {
    this.clearResults();
    const pageNums = [1, 2, 3];
    const { searchText, searchType } = this.state;
    pageNums.forEach(num => {
      axios(`/api/movies/search/${searchType === 'exact' ? 't' : 's'}/${searchText}/${num}`)
        .then(({ data }) => {
          if (data) {
            if (data.Search) {
              this.setState(prevState => ({
                searchResults: [...data.Search, ...prevState.searchResults],
              }));
            } else {
              this.setState(() => ({
                searchResults: [data],
              }));
            }
          }
        })
        .catch(console.log);
    });
  };

  handleDelay = debounce(this.handleSearch, 300);

  handleFocus = (bool, time = 0) => {
    setTimeout(() => {
      this.setState({
        allowResults: bool,
        inputColorChange: bool,
      });
    }, time);
  };

  handleRedirect = movie => {
    const {
      history,
      fetchMovie,
      fetchMovieComments,
      fetchMovieStats,
    } = this.props;

    const remappedMovie = {
      title: movie.Title,
      year: movie.Year,
      id: movie.imdbID,
    };

    fetchMovie(movie.imdbID);
    fetchMovieComments(movie.imdbID);
    fetchMovieStats(remappedMovie, false);

    history.push(
      `/movies/${movie.Title.split(' ').concat([movie.Year]).join('-')}`,
      { movie: remappedMovie }
    );

    this.clear();
  };

  renderResults = () => {
    const { searchResults } = this.state;
    if (searchResults) {
      return (
        <div className='bg-white movie-result-scroll'>
          {searchResults.map(movie => (
            <SearchResult
              movie={movie}
              handleRedirect={this.handleRedirect}
              key={movie.id}
            />
          ))}
        </div>
      );
    }
  };

  render() {
    const { marginTopVal, itemsCount } = this.props;
    const { searchText, allowResults, inputColorChange } = this.state;

    return (
      <div
        className={`${
          itemsCount > 19 ? 'd-none' : 'd-flex'
        } flex-column movie-search-container w-100 mt-${marginTopVal}`}
      >
        <div className='d-flex search-bar'>
          <input
            autoComplete='off'
            name='searchText'
            className={`movie-search-input pl-3 w-100 ${
              inputColorChange && 'movie-search-input-focused'
            }`}
            placeholder='Search for films...'
            value={searchText}
            onChange={this.onTextChange}
            onKeyUp={this.onKeyUp}
            onFocus={() => this.handleFocus(true)}
            onBlur={() => this.handleFocus(false, 200)}
          ></input>
          <div
            onClick={this.clear}
            title='clear search text'
            className={`clear-search ${!searchText ? 'd-none' : 'd-block'}`}
          >
            ✕
          </div>
        </div>
        {allowResults && this.renderResults()}
      </div>
    );
  }
}

MovieSearch.propTypes = {
  fetchMovie: PropTypes.func.isRequired,
  fetchMovieComments: PropTypes.func.isRequired,
  fetchMovieStats: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  fetchMovie: id => dispatch(fetchMovie(id)),
  fetchMovieStats: (movie, update) => dispatch(fetchMovieStats(movie, update)),
  fetchMovieComments: id => dispatch(fetchMovieComments(id)),
});

export default withRouter(connect(null, mapDispatchToProps)(MovieSearch));
