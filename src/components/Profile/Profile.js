import React, { PureComponent } from 'react';
import CommentColumn from '../CommentColumn/CommentColumn';
import Description from '../Description/Description';
import SaveDelete from '../SaveDelete/SaveDelete';
import SortableList from '../SortableList/SortableList';
import Search from '../Search/Search';

import './Profile.css';

class Profile extends PureComponent {

  render() {

    return (
      <div className="profile-wrapper" >
        <div className="main-container bg-light2 mt-4">
          <div className="left-col bg-white1">
            <div className="search-btns-container">
              <SaveDelete />
              <Search />
            </div>
            <SortableList />
            <Description />
          </div>
          <div className="right-col">
            <CommentColumn className="comments" />
          </div>
        </div>
      </div >
    );
  }
}

export default Profile;
