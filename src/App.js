import React, { Component } from 'react';
import './App.css';
import SiteHeader from './components/SiteHeader';
import ListHeader from './components/ListHeader';
import CommentColumn from './components/CommentColumn';
import List from './components/List';

class App extends Component {
  render() {
    return (
      <div className="App">
        <SiteHeader />
        <ListHeader />
        <List />
        <CommentColumn />
      </div>
    );
  }
}

export default App;
