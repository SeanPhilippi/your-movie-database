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

  inputStyle = {
    fontSize: 22,
    display: 'block',
    paddingLeft: 16,
    margin: 'auto',
    marginTop: 20,
    width: '40%'
  }
  
  apiKey = process.env.API_KEY;

  renderResults = () => {
    const { searchResults } = this.state;
    if (searchResults) {
      return searchResults.map(movie =>
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
      )
    }
  }

  handleAdd = (movie) => {
    const { addToList } = this.props;

    // fetch call to grab movie from api by id, then grab director 
    fetch(`http://www.omdbapi.com/?i=${movie.imdbID}&apikey=${apiKey}`)
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

  handleSearch = (num) => {
    const { searchText } = this.state;
    fetch(`http://www.omdbapi.com/?s=${searchText.trim()}&apikey=${apiKey}&page=${num}`)
    .then(res => res.json())
    .then(data => {
      this.setState({searchResults: data.Search})
    })
    .catch(err => console.error(err));
  }

  onTextChange = e => {
    this.setState({searchText: e.target.value});
    this.handleDelay();
  }

  handleDelay = debounce(this.handleSearch, 300);

  clearResults = () => {
    this.setState({searchResults: []});
  }

  clearSearchText = () => {
    this.setState({searchText: ''});
  }

  onKeyUp = e => {
    if (e.key === 'Enter') {
      // TODO: add more pages later when scroll container is integrated
      const arr = [1, 2];
      arr.map(num => {
        return this.handleSearch(num);
      })
    }
  }

  render() {

    return (
      <div className="Search">
      {/* old search bar connected to redux with materialui and only rendering on 'enter' press */}
        {/* <input
          type="text"
          placeholder="Add a film..."
          style={this.inputStyle}
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          onKeyUp={onKeyUp}
        /> */}
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

// mapping Redux global state to props
const mapStateToProps = state => ({
  list: state.list,
});

// mapping dispatched actions to props
const mapDispatchToProps = dispatch => ({
  addToList: movie => dispatch(addToList(movie)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);