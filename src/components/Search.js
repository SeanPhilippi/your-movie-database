import React from 'react';
import { connect } from 'react-redux';

import {
  setSearchText,
  getSearchResults,
  setMovieList,
  clearSearchResults
} from '../redux/actions';

class Search extends React.Component {

  state = {
    results: this.props.results
  }

  inputStyle = {
    fontSize: 22,
    display: 'block',
    paddingLeft: 16,
    margin: 'auto',
    marginTop: 20,
    width: '40%'
  }

  renderResults = () => {
    return this.props.searchResults.map(movie =>
      <div
        key={movie.imdbID}
        onClick={() => this.handleAdd(movie)}
      >
        {movie.Title}({movie.Year})
      </div>
    )
  }

  handleAdd = (movie) => {
    const { apiUrl, apiKey, setList, clearResults } = this.props;
    const newMovie = {};
    // add functionality for adding another draggable item to DraggableList
    // fetch call to grab movie from api by id, then grab director and maybe country
    // from that create newMovie json object to put into state.list

    fetch(`${apiUrl}i=${movie.imdbID}&apikey=${apiKey}`)
      .then(res => res.json())
      .then(data => {
        setList({
          name: movie.Title,
          year: movie.Year,
          director: data.Director,
          id: data.imdbID
        });
        clearResults();
      });
  }

  render() {
    const { searchText, handleSearchText, getResults } = this.props;

    const onKeyUp = e => {
      if (e.key === 'Enter') {
        getResults();
      }
    }

    return (
      <div className="Search">
        <input
          type="text"
          placeholder="Add a film..."
          style={this.inputStyle}
          value={searchText}
          onChange={e => handleSearchText(e.target.value)}
          onKeyUp={onKeyUp}
        />
        <div>
          {this.renderResults()}
        </div>
      </div>
    )
  }
}

// mapping Redux global state to props
const mapStateToProps = state => ({
  searchText: state.searchText,
  searchResults: state.searchResults,
  list: state.list,
  apiKey: state.apiKey,
  apiUrl: state.apiUrl
});

// mapping dispatched actions to props
const mapDispatchToProps = dispatch => ({
  handleSearchText: text => dispatch(setSearchText(text)),
  getResults: () => dispatch(getSearchResults()),
  setList: movie => dispatch(setMovieList(movie)),
  clearResults: () => dispatch(clearSearchResults())
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);