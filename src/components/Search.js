import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import SearchResult from './SearchResult';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import debounce from '../utils/helpers/debounce.js';
import { addToList, setAddError } from '../redux/actions';

class Search extends PureComponent {
  state = {
    searchText: '',
    searchResults: [],
  };

  focusInput = React.createRef();

  handleAdd = movie => {
    const { addToList, items } = this.props;
    // fetch call to grab movie from api by id, then grab director
    fetch(`/api/movies/addMovie/${movie.imdbID}`)
      .then(res => res.json())
      .then(data => {
        let titles = items.map(item => item.title);
        console.log('titles', titles)
        if (!titles.includes(movie.Title)) {
          if (items.length < 20) {
            addToList({
              title: movie.Title,
              year: movie.Year,
              director: data.Director,
              id: data.imdbID,
              runtime: data.Runtime,
              country: data.Country,
              plot: data.Plot,
              poster: data.Poster
            });
            // refocuses selector in search bar after add
            this.focusInput.current.focus();
          } else {
            this.props.setAddError(true);

          }
          this.clearResults();
          this.clearSearchText();
        };
      })
  }

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
            { searchResults.map(movie => <SearchResult movie={ movie } handleAdd={ this.handleAdd } key={ movie.imdbID } />) }
          </div>
      )
    }
  }
  // ! this is working, but need a timeout to also clear results if user pauses when typing
  // this way results don't continue to concatenate to results array
  // also maybe completely refresh search results as more characters are entered since
  // a search should continuously filter out more as the input query value length increases
  onKeyUp = e => {
    if (e.key === 'Backspace') {
      this.clearResults();
      this.handleDelay();
    }
  }

  handleSearch = () => {
    this.clearResults();
    const pageNums = [1, 2, 3];
    const { searchText } = this.state;
    pageNums.forEach(num => {
      fetch(`api/movies/search/${searchText}/${num}`)
        .then(res => res.json())
        .then(data => {
          if (data.Search) {
            console.log('data.Search', data.Search)
            this.setState((prevState) => ({ searchResults: [...data.Search, ...prevState.searchResults] }));
            this.renderResults();
          }
        })
        .catch(console.log);
      });
  };

  handleDelay = debounce(this.handleSearch, 300);

  onTextChange = e => {
    this.setState({ searchText: e.target.value });
    // ! temp solution, prob not ideal, look up best practices
    if (this.state.searchText && this.state.searchText.length > 1) {
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

  render() {
    const { marginTopVal, users } = this.props;
    const { searchText } = this.state;

    return (
      <div className={`d-flex flex-column align-items-center mt-${ marginTopVal }`}>
        <input
          ref={ this.focusInput }
          autoFocus
          name="searchText"
          className="search-text pl-3 w-100"
          placeholder={ !users ? "  Search for films..." : "Type a member's name..." }
          value={ searchText }
          onChange={ this.onTextChange }
          onKeyUp={ this.onKeyUp }
          onBlur={ this.clearResults }
        >
        </input>
        { this.renderResults() }
      </div>
    )
  }
}

Search.propTypes = {
  addToList: PropTypes.func.isRequired,
  setAddError: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  items: state.items
});

const mapDispatchToProps = dispatch => ({
  addToList: movie => dispatch(addToList(movie)),
  setAddError: bool => dispatch(setAddError(bool)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
