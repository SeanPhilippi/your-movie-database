import React, { Component } from 'react';
import './App.css';
import SiteHeader from './components/SiteHeader';
import ListHeader from './components/ListHeader';
import CommentColumn from './components/CommentColumn';
import Footer from './components/Footer';
// import List from './components/List';

// moviedb api key: db0fb828044fb9954101dd9eef659794

class App extends Component {

  state = {
    results: [],
    listItems: []
  }

  componentDidMount() {
    fetch('/mov')
  }

  render() {
    return (
      <div className="App">
        <SiteHeader />
        <ListHeader />
        {/* <List /> */}
        <CommentColumn />
        <Footer />
      </div>
    );
  }
}

export default App;
