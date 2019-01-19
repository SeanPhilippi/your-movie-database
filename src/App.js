import React, { Component } from 'react';
import './App.css';
import SiteHeader from './components/SiteHeader';
import ListHeader from './components/ListHeader';
import CommentColumn from './components/CommentColumn';
import Footer from './components/Footer';
import SortableComponent from './components/SortableComponent';
// import List from './components/List';
import Search from './components/Search';
import { connect } from 'react-redux';
import { orderList } from './redux/actions';

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
        <Search
          add={this.handleAdd}
        />
        <SortableComponent list={this.props.list} onSortEnd={this.props.orderList} />
        {/* <List add={this.handleAdd} list={this.state.list} /> */}
        <CommentColumn />
        <Footer />
      </div >
    );
  }
}

const mapStateToProps = state => ({
  list: state.list
});

const mapDispatchToProps = dispatch => ({
  orderList: (oldIndex, newIndex) => dispatch(orderList(oldIndex, newIndex))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
