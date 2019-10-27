import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import List from './List/List';
import Comments from './Comments';
import Statement from './Statement/Statement';
import Affinities from './Affinities';
import CardWrapper from './HOCs/CardWrapper';
import withLoading from './HOCs/withLoading';
import {
  setListDataLoading,
  setCommentsLoading,
  fetchComments,
  fetchListData,
  setEditing,
} from '../redux/actions';

const CommentsWithLoading = withLoading(Comments);

class Profile extends PureComponent  {

  fetchData = () => {
    console.log('fetching data in Profile')
    const {
      fetchListData,
      fetchComments,
      user,
      history: {
        location: {
          pathname
        }
      }
    } = this.props;
    const { username } = this.props.match.params;
    if (pathname === '/profile') {
      fetchListData(user.username);
      fetchComments(user.username);
    } else {
      fetchListData(username);
      fetchComments(username);
    };
  };

  componentDidMount() {
    this.fetchData();
  };

  componentDidUpdate(prevProps) {
    const { username } = this.props.match.params;
    if (username !== prevProps.match.params.username) {
      this.fetchData();
    };
  };

  render() {
    const {
      user,
      username,
      comments,
      items,
      statement,
      affinities,
      isEditing,
      listDataLoading,
      commentsLoading,
      affinitiesLoading,
      history: {
        location: {
          pathname
        }
      }
    } = this.props;

    return (
      <div className="grid-container bg-light2 mt-4">
        <div className="bg-white">
          <div className="px-4 pt-4 w-100">
            <CardWrapper
              icon={["far", "list-alt"]}
              rotate={ -5 }
              title={`${ pathname === '/profile' ? user.username : username }'s Top Movies`}
              color="tan"
              marginTopVal='0'
            >
              <List
                user={ user }
                username={ username }
                items={ items }
                isEditing={ isEditing }
                isLoading={ listDataLoading }
              />
            </CardWrapper>
          </div>
          <div className="px-4">
            <CardWrapper
              icon={["fas", "file-alt"]}
              rotate={ -5 }
              title="user statement"
              color="tan"
            >
              <Statement
                user={ user }
                username={ pathname === '/profile' ? user.username : username }
                statement={ pathname === '/profile' ? user.statement : statement }
                isEditing={ isEditing }
                isLoading={ listDataLoading }
              />
            </CardWrapper>
          </div>
          <div className="px-4">
            <CardWrapper
              icon="book"
              rotate={ -5 }
              title="affinities"
              color="tan"
            >
              <Affinities
                isLoading={ affinitiesLoading }
                affinities={ affinities }
              />
            </CardWrapper>
          </div>
        </div>
        <div className="m-4">
          <CardWrapper
            icon="comments"
            title="comments"
            color="white"
            marginTopVal="0"
          >
            <CommentsWithLoading
              isLoading={ commentsLoading }
              comments={ comments }
            />
          </CardWrapper>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }).isRequired,
  username: PropTypes.string,
  items: PropTypes.array,
  statement: PropTypes.string,
  comments: PropTypes.array,
  affinities: PropTypes.array,
  isEditing: PropTypes.bool.isRequired,
  listDataLoading: PropTypes.bool.isRequired,
  commentsLoading: PropTypes.bool.isRequired,
  affinitiesLoading: PropTypes.bool.isRequired,
  setEditing: PropTypes.func.isRequired,
  setListDataLoading: PropTypes.func.isRequired,
  setCommentsLoading: PropTypes.func.isRequired,
  fetchComments: PropTypes.func.isRequired,
  fetchListData: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  setEditing: bool => dispatch(setEditing(bool)),
  setListDataLoading: bool => dispatch(setListDataLoading(bool)),
  setCommentsLoading: bool => dispatch(setCommentsLoading(bool)),
  fetchComments: user => dispatch(fetchComments(user)),
  fetchListData: username => dispatch(fetchListData(username)),
});

const mapStateToProps = state => ({
  user: state.user,
  username: state.username,
  comments: state.comments,
  items: state.items,
  statement: state.statement,
  affinities: state.affinities,
  isEditing: state.isEditing,
  listDataLoading: state.listDataLoading,
  commentsLoading: state.commentsLoading,
  affinitiesLoading: state.affinitiesLoading
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile));