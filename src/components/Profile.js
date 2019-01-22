import React, { Component } from 'react';
import './Profile.css';
import SiteHeader from './SiteHeader';
import CommentColumn from './CommentColumn';
import Footer from './Footer';
import Description from './Description';
import SaveDelete from './SaveDelete';
import SortableComponent from './SortableComponent';
// import List from './components/List';
import Search from './Search';

class Profile extends Component {

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
      <div className="profile-wrapper" >
        <SiteHeader />
        <div className="main-container">
          <div className="left">
            <SaveDelete />
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

export default Profile;
