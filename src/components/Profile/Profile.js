import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CommentColumn from '../CommentColumn/CommentColumn';
import UserStatement from '../UserStatement/UserStatement';
import SaveDelete from '../SaveDelete/SaveDelete';
import SortableList from '../SortableList/SortableList';
import CardWrapper from '../CardWrapper/CardWrapper';
import Search from '../Search/Search';
import ViewableList from '../ViewableList/ViewableList';

import './Profile.css';

const Profile = props =>  (
  <div className="profile-wrapper" >
    <div className="main-container bg-light2 mt-4">
      <div className="left-col bg-white1">
        <div className="px-4 pt-4 w-100">
          <CardWrapper title={`${props.user.username || 'User'}'s Top Movies`} color="tan">
            <div className="search-btns-container">
              <SaveDelete />
            </div>
            {
              props.isAuthenticated
              ? (
                <div>
                  <Search />
                  <SortableList />
                </div>
              )
              : <div>
                  <ViewableList/>
                </div>
            }
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

Profile.propTypes = {
  movie: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
  isAuthenticated: state.isAuthenticated,
});

export default connect(mapStateToProps)(Profile);
