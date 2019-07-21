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
            <div className="edit-list-container bg-light1 mt-4 shadow">
              <div className="card-title">
                USER TOP MOVIES
              </div>
              <div className="edit-list-inner-container d-flex flex-column align-items-center">
                <div className="search-btns-container">
                  <SaveDelete />
                </div>
                <Search />
                <SortableList />
                <Description />
              </div>
            </div>
          </div>
          <div className="right-col">
            <CommentColumn className="comments" />
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
