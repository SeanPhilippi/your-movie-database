import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Comments from './Comments';
import EditableStatement from './EditableStatement';
import UserStatement from './UserStatement';
import SaveDelete from './SaveDelete';
import SortableList from './SortableList';
import CardWrapper from './HOCs/CardWrapper';
import Search from './Search';
import ViewableList from './ViewableList';
import Affinities from './Affinities';
import WithLoading from './HOCs/WithLoading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  setListDataLoading,
  setCommentsLoading,
  fetchComments,
  fetchListData
} from '../redux/actions';

class Profile extends PureComponent  {

  fetchData = () => {
    const { fetchListData, fetchComments, user } = this.props;
    const { username } = this.props.match.params;
    fetchListData(username || user.username);
    fetchComments(username || user.username);
  }

  componentDidMount() {
    this.fetchData();
  };

  componentDidUpdate(prevProps) {
    const { username } = this.props.match.params;
    if (username !== prevProps.match.params.username) {
      this.fetchData();
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
        />;

    const ListWithLoading = WithLoading(List);
    const StatementWithLoading = WithLoading(Statement);
    const AffinitiesWithLoading = WithLoading(Affinities);
    const CommentsWithLoading = WithLoading(Comments);

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
              <ListWithLoading isLoading={ listDataLoading } />
            </CardWrapper>
          </div>
          <div className="px-4">
            <CardWrapper
              icon={["fas", "file-alt"]}
              rotate={ -5 }
              title="user statement"
              color="tan"
            >
              <StatementWithLoading isLoading={ listDataLoading } />
            </CardWrapper>
          </div>
          <div className="px-4">
            <CardWrapper
              icon="book"
              rotate={ -5 }
              title="affinities"
              color="tan"
            >
              <AffinitiesWithLoading
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
