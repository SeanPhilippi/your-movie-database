import React, { Component } from 'react';
import './Profile.css';
import SiteHeader from './SiteHeader';
import CommentColumn from './CommentColumn';
import Description from './Description';
import SaveDelete from './SaveDelete';
import SortableList from './SortableList';
import Search from './Search';

class Profile extends Component {

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
