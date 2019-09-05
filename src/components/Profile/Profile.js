import React, { PureComponent } from 'react';
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

class Profile extends PureComponent  {
  state = {
    listData: {
      username: '',
      items: [],
      statement: '',
    }
  }

  componentDidMount() {
    console.log('here')
    console.log(this.props.match.params.username)
    if (this.props.match.params.username) {
      console.log('fetching listData in Profile...')
      fetch(`/api/movies/${ this.props.match.params.username }/list`)
        .then(res => {
          console.log('res in profile', res)
          return res.json()})
        .then(data => {
          const fetchedListData = {
            username: data.username,
            items: data.items,
            statement: data.statement
          };
          this.setState({ listData: fetchedListData })
        })
    }
  }

  render() {
    return (
      <div className="profile-wrapper" >
        <div className="main-container bg-light2 mt-4">
          <div className="left-col white">
            <div className="px-4 pt-4 w-100">
              <CardWrapper title={`${this.props.user.username || this.props.match.params.username}'s Top Movies`} color="tan">
                {
                  this.props.isAuthenticated
                  ? (
                    <div>
                      <div className="search-btns-container">
                        <SaveDelete />
                      </div>
                      <Search />
                      <SortableList />
                    </div>
                  )
                  : <div>
                      <ViewableList items={ this.state.listData.items }/>
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
  }
}

Profile.propTypes = {
  user: PropTypes.object,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
  isAuthenticated: state.isAuthenticated,
});

export default connect(mapStateToProps)(Profile);
