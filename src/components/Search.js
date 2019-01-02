import React from 'react';
import { connect } from 'react-redux';

import {
  setSearchText,
  getSearchResults
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
    width: '42%'
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

const mapStateToProps = state => ({
  searchText: state.searchText,
  searchResults: state.searchResults
});

const mapDispatchToProps = dispatch => ({
  handleSearchText: text => dispatch(setSearchText(text)),
  getResults: () => dispatch(getSearchResults())
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);