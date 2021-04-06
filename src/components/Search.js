import React, { PureComponent, createRef } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import SearchResult from './SearchResult';
import { connect } from 'react-redux';
import { addToList } from '../redux/actions';
import debounce from '../utils/helpers/debounce.js';
import removeDupes from '../utils/helpers/removeDupes.js';

class Search extends PureComponent {
  state = {
    searchText: '',
    searchResults: [],
    allowResults: false,
  };

  focusInput = createRef();

  onTextChange = async e => {
    this.clearResults();
    await this.setState({ searchText: e.target.value });
    this.handleSearch();
  };

  handleSearch = debounce(() => {
    const { searchText } = this.state;
    if (searchText.length) {
      if (searchText.length > 2) {
        const pageNums = [1, 2, 3];
        pageNums.forEach(num => {
          // /s/ is substring search, requires query of at least 3 characters
          axios(`/api/movies/search/s/${searchText}/${num}`)
            .then(({ data }) => {
              if (data && data.Search) {
                const results = removeDupes(data.Search, 'imdbID');
                this.setState(prevState => ({
                  searchResults: [...results, ...prevState.searchResults],
                }));
              }
            })
            .catch(console.log);
        });
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

  handleFocus = (bool, time = 0) => {
    setTimeout(() => {
      this.setState({ allowResults: bool });
    }, time);
  };

  handleAdd = movie => {
    const { addToList } = this.props;
    const remappedMovie = {
      title: movie.Title,
      year: movie.Year,
      id: movie.imdbID,
    };

    addToList(remappedMovie).then(added => {
      if (added && this.focusInput.current) {
        this.focusInput.current.focus();
      }
      this.clearResults();
      this.clearSearchText();
    });
  };

  renderResults = () => {
    const { searchResults } = this.state;
    const { users } = this.props;

    if (searchResults) {
      return users ? (
        <div className='bg-white result-scroll'>
          {users.map(user => (
            <SearchResult user={user} key={user._id} />
          ))}
        </div>
      ) : (
        <div className='bg-white result-scroll'>
          {searchResults.map(movie => {
            if (!JSON.stringify(movie).includes('Movie not found')) {
              return (
                <SearchResult
                  movie={movie}
                  handleAdd={this.handleAdd}
                  key={movie.imdbID}
                />
              )
            }
          })}
        </div>
      );
    }
  };

  render() {
    const { marginTopVal, users, itemsCount } = this.props;
    const { searchText, allowResults } = this.state;

    return (
      <div
        className={`${
          itemsCount > 19 ? 'd-none' : 'd-flex'
        } flex-column align-items-center mt-${marginTopVal}`}
      >
        <input
          ref={this.focusInput}
          autoComplete='off'
          autoFocus
          name='searchText'
          className='search-input pl-3 w-100'
          placeholder={
            !users ? 'Search for films...' : "Type a member's name..."
          }
          value={searchText}
          onChange={this.onTextChange}
          onKeyUp={this.onKeyUp}
          onFocus={() => this.handleFocus(true)}
          onBlur={() => this.handleFocus(false, 200)}
        ></input>
        {allowResults && this.renderResults()}
      </div>
    );
  }
}

Search.propTypes = {
  addToList: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  addToList: (movie, post) => dispatch(addToList(movie, post)),
});

export default connect(null, mapDispatchToProps)(Search);
