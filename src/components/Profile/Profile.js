import React from 'react';
import CommentColumn from '../CommentColumn/CommentColumn';
import UserStatement from '../UserStatement/UserStatement';
import SaveDelete from '../SaveDelete/SaveDelete';
import SortableList from '../SortableList/SortableList';
import CardWrapper from '../CardWrapper/CardWrapper';
import Search from '../Search/Search';

import './Profile.css';

const Profile = () =>  (
  <div className="profile-wrapper" >
    <div className="main-container bg-light2 mt-4">
      <div className="left-col bg-white1">
        <div className="px-4 pt-4 w-100">
          <CardWrapper title="User Top Movies" color="tan">
            <div className="search-btns-container">
              <SaveDelete />
            </div>
            <Search />
            <SortableList />
          </CardWrapper>
        </div>
        <div className="px-4 w-100">
          <CardWrapper title="user statement" color="tan">
            <UserStatement />
          </CardWrapper>
        </div>
      </div>
      <div className="right-col">
        <div className="m-4">
          <CardWrapper title="comments" color="white">
            <CommentColumn className="comments" />
          </CardWrapper>
        </div>
      </div>
    </div>
  </div>
);

export default Profile;
