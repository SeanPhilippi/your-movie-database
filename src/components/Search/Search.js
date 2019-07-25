import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import SearchResult from '../SearchResult/SearchResult';
import { connect } from 'react-redux';
import debounce from '../../utils/helpers/debounce.js';
import { addToList } from '../../redux/actions';
import './Search.css';

class Search extends PureComponent {
  state = {
    searchText: '',
    searchResults: [],
  };

  handleAdd = movie => {
    const { addToList, list } = this.props;
    // fetch call to grab movie from api by id, then grab director
    fetch(`/api/movies/addMovie/${movie.imdbID}`)
      .then(res => res.json())
      .then(data => {
        let titles = list.map(item => item.name);
        if (!titles.includes(movie.Title)) {
          if (list.length < 20) {
            addToList({
              title: movie.Title,
              year: movie.Year,
              director: data.Director,
              id: data.imdbID,
              runtime: data.Runtime,
              country: data.Country,
              plot: data.Plot,
              language: data.Language
            });
          }
          this.clearResults();
          this.clearSearchText();
        };
      })
  }

  renderResults = () => {
    const { searchResults } = this.state;
    if (searchResults) {
      return (
        <div className="bg-white1 result-scroll">
          { searchResults.map(movie => <SearchResult movie={movie} handleAdd={ this.handleAdd } />) }
        </div>
      )
    }
  }
  // ! this is working, but need a timeout to also clear results if use pauses when typing
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
    console.log('firing');
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
  }


  clearResults = () => {
    this.setState(() => ({ searchResults: [] }));
  };

  clearSearchText = () => {
    this.setState(() => ({ searchText: '' }));
  };

  render() {
    return (
      <div className="search d-flex flex-column align-items-center">
        <input
          name="searchText"
          className="search-text"
          placeholder="  Search for films..."
          value={this.state.searchText}
          onChange={this.onTextChange}
          onKeyUp={this.onKeyUp}
        >
        </input>
        { this.renderResults() }
      </div>
    )
  }
}

Search.propTypes = {
  addToList: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  list: state.list,
})

const mapDispatchToProps = dispatch => ({
  addToList: movie => dispatch(addToList(movie)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
