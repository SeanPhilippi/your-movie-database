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
    list: []
  }

  componentDidMount = () => {
    fetch('/list')
      .then(res => res.json())
      .then(data => {
        console.log('data', data);
        this.setState({ list: data })
      })
      .catch(err => console.log(err));
  }

  handleAdd = () => {
    this.setState({ results: [] });
    // add functionality for adding another draggable item to draggableList
  }

  render() {
    return (
      <div className="App">
        <SiteHeader />
        <ListHeader />
        <Search add={this.handleAdd} />
        <List add={this.handleAdd} list={this.state.list} />
        <CommentColumn />
        <Footer />
      </div>
    );
  }
}

export default App;
