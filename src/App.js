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
    // list: [
    //   { name: '2001: A Space Odyssey', year: '1968', director: 'Stanley Kubrick', subtitle: true },
    //   { name: 'Mulholland Drive', year: '2001', director: 'David Lynch', subtitle: true },
    //   { name: 'Pickpocket', year: '1955', director: 'Robert Bresson', subtitle: true },
    //   { name: 'Persona', year: '1966', director: 'Ingmar Bergman', subtitle: true },
    //   { name: 'Solaris', year: '1972', director: 'Andrei Tarkovsky', subtitle: true },
    //   { name: '2046', year: '2004', director: 'Wong Kar-Wai', subtitle: true },
    //   { name: 'Three Colors: Blue', year: '1993', director: 'Krzysztof Kieslowski', subtitle: true }
    // ],
    searchText: '',
    apiUrl: 'http://www.omdbapi.com/?',
    apiKey: 'd5d74a24&'
  }

  // componentDidMount = () => {
  //   fetch('/list')
  //     .then(res => res.json())
  //     .then(data => {
  //       console.log('data', data);
  //       // this.setState({ list: data })
  //     })
  //     .catch(err => console.log(err));
  // }

  // onTextChange = e => {
  //   this.setState({ searchText: e.target.value });
  // }

  render() {

    return (
      <div className="App">
        <SiteHeader />
        <ListHeader />
        <Search
          add={this.handleAdd}
        />
        <List add={this.handleAdd} list={this.state.list} />
        <CommentColumn />
        <Footer />
      </div>
    );
  }
}

export default App;
