import React from 'react';
import { connect } from 'react-redux';
import './Search.css';
import TextField from 'material-ui/TextField';
import debounce from './debounce.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import {
  addToList,
} from '../../redux/actions';

class Search extends React.Component {

  state = {
    searchText: '',
    searchResults: [],
  }
  
  renderResults = () => {
    const { searchResults } = this.state;
    if (searchResults) {
      return searchResults.map(movie =>
        <div
          key={movie.imdbId}
          className="result-item"
          onClick={() => this.handleAdd(movie)}
        >
          {/* <MovieResult movie={movie} /> */}
          <div className="result-info">
            <div style={{ fontSize: "15px" }}>
              {movie.Title} ({movie.Year})
            </div>
          </div>
        </div>
      )
    }
  }

  // TODO: search - add pagination
  handleSearch = () => {
    const { searchText } = this.state;
    fetch(`/search/${searchText}`)
    .then(res => res.json())
    .then(data => {
      this.setState({searchResults: data.Search})
    })
    .catch(err => console.log(err));
  }

  handleDelay = debounce(this.handleSearch, 300);

  onTextChange = e => {
    this.setState({searchText: e.target.value});
    // fire handle search through debounce function to reduce api calls with delay
    this.handleDelay();
  }

  handleAdd = movie => {
    const { addToList } = this.props;
    // fetch call to grab movie from api by id, then grab director 
    fetch(`/addMovie/${movie.imdbID}`)
      .then(res => res.json())
      .then(data => {
        addToList({
          name: movie.Title,
          year: movie.Year,
          director: data.Director,
          id: data.imdbID,
          runtime: data.Runtime,
          country: data.Country,
          plot: data.Plot,
          language: data.Language
        });
        this.clearResults();
        this.clearSearchText();
      });
  }

  clearResults = () => {
    this.setState({searchResults: []});
  }

  clearSearchText = () => {
    this.setState({searchText: ''});
  }

  // onKeyUp = e => {
  //   if (e.key === 'Enter') {
  //     // TODO: add more pages later when scroll container is integrated
  //     const arr = [1, 2];
  //     arr.map(num => {
  //       return this.handleSearch(num);
  //     })
  //   }
  // }

  render() {

    return (
      <div className="Search">
        <MuiThemeProvider>
        <TextField
          name="searchText"
          value={this.state.searchText}
          onChange={this.onTextChange}
          onKeyUp={this.onKeyUp}
          floatingLabelText="Search For Films"
          style={{width: '36rem'}}
        />
        </MuiThemeProvider>
        <div>
          {this.renderResults()}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  list: state.list,
});

const mapDispatchToProps = dispatch => ({
  addToList: movie => dispatch(addToList(movie)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);