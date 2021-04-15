import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import SearchResult from './SearchResult';
import debounce from '../utils/helpers/debounce.js';
import removeDupes from '../utils/helpers/removeDupes.js';
const similar = require('string-similarity');

class MovieSearch extends PureComponent {
  state = {
    searchText: '',
    searchResults: [],
    allowResults: true,
    inputColorChange: false,
  };

  onTextChange = async e => {
    this.clearResults();
    await this.setState({ searchText: e.target.value });
    this.handleSearch();
  };

  handleSearch = debounce(async () => {
    const { searchText } = this.state;
    if (searchText.length) {
      if (searchText.length > 2) {
        const pageNums = [1, 2, 3];
        const results = [];
        for (const num of pageNums) {
          // /s/ is substring search, requires query of at least 3 characters
          await axios(`/api/movies/search/s/${searchText}/${num}`)
            .then(({ data }) => {
              if (data && data.Search) {
                results.push(...data.Search);
              }
            })
            .catch(console.log);
        };
        results.forEach(result => {
          const match = similar.compareTwoStrings(result.Title.toLowerCase().trim(), searchText.toLowerCase().trim());
          result.match = match;
        });
        const orderedResults = results.sort((a, b) => b.match - a.match);
        const searchResults = removeDupes(orderedResults, 'imdbID');
        this.setState({ searchResults });
        // if searchText.length is 1-2
      } else {
        // /t/ is exact search, use for queries under 3 characters, so movies like 'Pi' can still get a result
        // only returns a single result unfortunately, omdb limitation
        axios(`/api/movies/search/t/${searchText}/1`)
          .then(({ data }) => {
            if (data) {
              this.setState({ searchResults: [data] });
            }
          })
          .catch(console.log);
      }
    }
  }, 300);

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
    } = this.props;

    const remappedMovie = {
      title: movie.Title,
      year: movie.Year,
      id: movie.imdbID,
    };

    history.push(
      `/movies/${movie.Title.split(' ').concat([movie.Year]).join('-')}`,
      { movie: remappedMovie }
    );

    this.clear();
  };

  renderResults = () => {
    const { searchResults } = this.state;
    if (searchResults.length) {
      return (
        <div className='bg-white movie-result-scroll'>
          {searchResults.map(movie => {
            if (!JSON.stringify(movie).includes('Movie not found')) {
              return (
                <SearchResult
                  movie={movie}
                  handleRedirect={this.handleRedirect}
                  key={movie.imdbID}
                />
              )
            } else {
              return null;
            }
          })}
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
          />
          <div
            onClick={this.clear}
            title='clear search text'
            className={`clear-search ${!searchText ? 'd-none' : 'd-block'}`}
          >
            ✕
          </div>
        </div>
        {allowResults && searchText && this.renderResults()}
      </div>
    );
  }
}

export default withRouter(MovieSearch);
