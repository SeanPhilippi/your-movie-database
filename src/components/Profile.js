import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import CommentColumn from './CommentColumn';
import EditableStatement from './EditableStatement';
import UserStatement from './UserStatement';
import SaveDelete from './SaveDelete';
import SortableList from './SortableList';
import CardWrapper from './CardWrapper';
import Search from './Search';
import ViewableList from './ViewableList';
import Affinities from './Affinities';
import Spinner from './Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  setListDataLoading,
  setCommentsLoading,
  fetchComments,
  fetchListData
} from '../redux/actions';

class Profile extends PureComponent  {

  componentDidMount() {
    const { fetchListData, fetchComments, user } = this.props;
    const { username } = this.props.match.params;
    fetchListData(username || user.username);
    fetchComments(username || user.username);
  };

  componentDidUpdate(prevProps) {
    const { user, fetchListData, fetchComments } = this.props;
    const { username } = this.props.match.params;
    if (username !== prevProps.match.params.username) {
      fetchListData(username || user.username);
      fetchComments(username || user.username);
    }
  };

  handleEdit = () => {
    this.props.history.push('/profile');
  };

  render() {
    const {
      match,
      user,
      comments,
      items,
      statement,
      affinities,
      listDataLoading,
      commentsLoading,
      affinitiesLoading
    } = this.props;

    const EditButton = () => (
      <button
        className="edit-btn mb-2"
        style={{ fontSize: '.9rem' }}
        onClick={ this.handleEdit }
      >
        <FontAwesomeIcon icon={["far","edit"]} />
      </button>
    );

    const List = () => {
      console.log('params username', match.params.username)
      if (!match.params.username) {
        return (
          <div>
            <div className="search-btns-container">
              <SaveDelete />
            </div>
            <Search itemsCount={ items.length }/>
            <SortableList />
          </div>
        )
      } else {
        return (
          <div>
            <div className="d-flex justify-content-end">
              {
                user.username === match.params.username && <EditButton />
              }
            </div>
            <ViewableList
              items={ items }
            />
          </div>
        )
      }
    };

    const Statement = () => !match.params.username
      ? <EditableStatement />
      : <UserStatement
          username={ match.params.username }
          statement={ statement }
        />

    return (
      <div className="grid-container bg-light2 mt-4">
        <div className="bg-white">
          <div className="px-4 pt-4 w-100">
            <CardWrapper
              icon={["far", "list-alt"]}
              rotate={ -5 }
              title={`${match.params.username || user.username}'s Top Movies`}
              color="tan"
              marginTopVal='0'
            >
              {
                match.params.username && listDataLoading
                ? <Spinner />
                : <List />
              }
            </CardWrapper>
          </div>
          <div className="px-4">
            <CardWrapper
              icon={["fas", "file-alt"]}
              rotate={ -5 }
              title="user statement"
              color="tan"
            >
              {
                match.params.username && listDataLoading
                ? <Spinner />
                : <Statement />
              }
            </CardWrapper>
          </div>
          <div className="px-4">
            <CardWrapper
              title="affinities"
              color="tan"
            >
              {
                affinitiesLoading
                ? <Spinner />
                : <Affinities affinities={ affinities }/>
              }
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
            {
              commentsLoading
              ? <Spinner />
              : <CommentColumn
                  comments={ comments }
                />
            }
          </CardWrapper>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  user: PropTypes.object,
  comments: PropTypes.array
};

const mapDispatchToProps = dispatch => ({
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
  listDataLoading: state.listDataLoading,
  commentsLoading: state.commentsLoading,
  affinitiesLoading: state.affinitiesLoading
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile));
