import React, { Component } from 'react';
import './Profile.css';
import SiteHeader from './SiteHeader';
import CommentColumn from './CommentColumn';
import Description from './Description';
import SaveDelete from './SaveDelete';
import SortableList from './SortableList';
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
            <SortableList />
            <Description />
          </div>
          <div className="right">
            <CommentColumn className="comments" />
          </div>
        </div>
      </div >
    );
  }
}

export default Profile;
