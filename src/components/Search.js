import React from 'react';
import { connect } from 'react-redux';

import {
  setSearchText,
  getResults,
  addToList,
  clearSearchResults
} from '../redux/actions';

class Search extends React.Component {

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
        key={movie.imdbId}
        className="result-item"
        onClick={() => this.handleAdd(movie)}
      >
        <div className="result-info">
          <div style={{ fontSize: "15px" }}>
            {movie.Title} ({movie.Year})
          </div>
        </div>
      </div>

      // <div
      //   
      // >
      //   {movie.Title}({movie.Year})
      // </div>
    )
  }

  handleAdd = (movie) => {
    const { apiUrl, apiKey, addToList, clearResults } = this.props;

    // fetch call to grab movie from api by id, then grab director and maybe country
    fetch(`${apiUrl}i=${movie.imdbID}&apikey=${apiKey}`)
      .then(res => res.json())
      .then(data => {
        addToList({
          name: movie.Title,
          year: movie.Year,
          director: data.Director,
          id: data.imdbID
        });
        clearResults();
      });
  }

  render() {
    const { searchText, setSearchText, clearResults, getResults } = this.props;

    const onKeyUp = e => {
      if (e.key === 'Enter') {
        clearResults();
        // add more pages later when scroll container is integrated
        const arr = [1, 2, 3];
        arr.map(num => {
          getResults(num);
        })
      }
    }

    return (
      <div className="Search">
        <input
          type="text"
          placeholder="Add a film..."
          style={this.inputStyle}
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
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
  setSearchText: text => dispatch(setSearchText(text)),
  getResults: num => dispatch(getResults(num)),
  addToList: movie => dispatch(addToList(movie)),
  clearResults: () => dispatch(clearSearchResults())
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);