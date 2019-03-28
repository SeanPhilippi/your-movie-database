import React, { Component } from 'react';
import './Profile.css';
import CommentColumn from '../CommentColumn/CommentColumn';
import Description from '../Description/Description';
import SaveDelete from '../SaveDelete/SaveDelete';
import SortableList from '../SortableList/SortableList';
import Search from '../Search/Search';

class Profile extends Component {

  render() {

    return (
      <div className="profile-wrapper" >
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
            {/* <CommentColumn className="comments" /> */}
          </div>
        </div>
      </div >
    );
  }
}

export default Profile;
