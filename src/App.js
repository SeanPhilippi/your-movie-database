import React, { Component } from 'react';
import './App.css';
import SiteHeader from './components/SiteHeader';
import ListHeader from './components/ListHeader';
import CommentColumn from './components/CommentColumn';
import Footer from './components/Footer';
import Description from './components/Description';
import SortableComponent from './components/SortableComponent';
// import List from './components/List';
import Search from './components/Search';

class App extends Component {

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
      <div className="App" >
        <SiteHeader />
        <ListHeader />
        <div className="main-container">
          <div className="left">
            <Search
              add={this.handleAdd}
            />
            <SortableComponent />
            {/* <List add={this.handleAdd} list={this.state.list} /> */}
            <Description />
          </div>
          <div className="right">
            <CommentColumn className="comments" />
          </div>
        </div>
        <Footer />
      </div >
    );
  }
}

export default App;
