import React, { Component } from 'react';
import './App.css';
import SiteHeader from './components/SiteHeader';
import ListHeader from './components/ListHeader';
import CommentColumn from './components/CommentColumn';
import Footer from './components/Footer';
import List from './components/List';
import Search from './components/Search';

class App extends Component {

  state = {
    results: [],
    list: [
      { name: '2001: A Space Odyssey', year: '1968', director: 'Stanley Kubrick', subtitle: true },
      { name: 'Mulholland Drive', year: '2001', director: 'David Lynch', subtitle: true },
      { name: 'Pickpocket', year: '1955', director: 'Robert Bresson', subtitle: true },
      { name: 'Persona', year: '1966', director: 'Ingmar Bergman', subtitle: true },
      { name: 'Solaris', year: '1972', director: 'Andrei Tarkovsky', subtitle: true },
      { name: '2046', year: '2004', director: 'Wong Kar-Wai', subtitle: true },
      { name: 'Three Colors: Blue', year: '1993', director: 'Krzysztof Kieslowski', subtitle: true }
    ],
    searchText: '',
    apiUrl: 'http://www.omdbapi.com/?',
    apiKey: 'd5d74a24&'
  }

  componentDidMount = () => {
    fetch('http://localhost:4300/list')
      .then(res => res.json())
      .then(data => {
        console.log('data', data);
        // this.setState({ list: data })
      })
      .catch(err => console.log(err));
  }

  handleAdd = (movie) => {
    this.setState({ results: [] });
    // add functionality for adding another draggable item to DraggableList
    const newMovie = {};
    newMovie.name = movie.Title;
    newMovie.year = movie.Year;
    newMovie.director = 'director';
    newMovie.subtitle = true;
    this.setState({
      list: [
        ...this.state.list,
        newMovie
      ]
    })
  }

  onTextChange = e => {
    this.setState({ searchText: e.target.value });
  }

  render() {

    const createResults = (movies) => {
      const moviesArr = [];
      movies.forEach(movie => {
        moviesArr.push(
          <div
            key={movie.imdbID}
            onClick={() => this.handleAdd(movie)}
          >
            {movie.Title}({movie.Year})
        </div>
        )
      })
      this.setState({ results: moviesArr });
    }

    const handleSearch = () => {
      const { searchText, apiUrl, apiKey } = this.state;
      fetch(`${apiUrl}s=${searchText}&apikey=${apiKey}`)
        .then(res => res.json())
        .then(data => {
          console.log('data', data.Search)
          const movies = createResults(data.Search);
          console.log('movies', movies);
        })
        .catch(err => console.error(err));
    }

    return (
      <div className="App">
        <SiteHeader />
        <ListHeader />
        <Search
          add={this.handleAdd}
          results={this.state.results}
          search={handleSearch}
          textChange={this.onTextChange}
        />
        <List add={this.handleAdd} list={this.state.list} />
        <CommentColumn />
        <Footer />
      </div>
    );
  }
}

export default App;
