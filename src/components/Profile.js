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
import { setListDataLoading, setCommentsLoading } from '../redux/actions';

class Profile extends PureComponent  {
  state = {
    listData: {
      username: '',
      items: [],
      statement: ''
    },
    listDataLoading: true,
    commentsLoading: true,
    comments: [],
    matches: []
  };

  getListData = username => {
    let fetchedListData;
    if (username) {
      fetch(`/api/movies/${ username }/list`)
        .then(res => res.json())
        .then(data => {
          if (data) {
            fetchedListData = {
              username: data.username,
              items: data.items,
              statement: data.statement
            };
            this.setState({
              ...this.state,
              listData: { ...fetchedListData },
              listDataLoading: false
            });
          }
        }) // fetch affinity data
        .then(() => {
          let movieIds;
          // * Affinity Matching
            if (username) {
              movieIds = fetchedListData.items.map(item => item.id);
            } else {
              movieIds = this.props.items.map(item => item.id);
            };
            console.log('*****Affinity Data****')
            console.log('username for movieIds: ', username)
            this.getAffinities(movieIds)
              .then(data => console.log('data in affinity', data))
              .catch(console.log)
        })
      }
  }

  getAffinities = movieIds => {
    console.log('getAffinities');
    return fetch('/api/movies/affinities', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(movieIds)
    }).then(res => res.json())
      .then(matches => {
      console.log('affinity matches', matches)
      this.setState({ matches });
      return matches;
    });
  };

  // getComments = username => {
  //   return fetch(`/api/comments/${ username }`)
  //     .then(res => res.json())
  //     .then(data => {
  //       if (data) {
  //         this.setState({ comments: data });
  //       }
  //       this.setState({ commentsLoading: false });
  //     }).catch(console.log);
  // };

  componentDidMount() {
    const { username } = this.props.match.params;
    this.getListData(username);
    // fetch comments
    let user;
    if (!username || username === this.props.user.username) {
      user = this.props.user.username;
    } else {
      user = username;
    }
    this.getComments(user);
  };

  componentDidUpdate(prevProps) {
    console.log('props in profile', prevProps, this.props)
    const { match, user } = this.props;
    if (prevProps.match.url !== match.url) {
      this.getListData();
      this.getComments(match.params.username || user.username);
    }
  };

  // componentDidUpdate(prevProps) {
  //   const { open, match } = this.props;
  //   if (prevProps.open !== open) {
  //     fetch(`/api/movies/${ match.params.username }/list`)
  //       .then(res => res.json())
  //       .then(data => {
  //         if (data) {
  //           const fetchedListData = {
  //             username: data.username,
  //             items: data.items,
  //             statement: data.statement
  //           };
  //           this.setState({
  //             ...this.state,
  //             listData: fetchedListData,
  //             listDataLoading: false
  //           });
  //         }
  //       })
  //   }
  // };

  handleEdit = () => {
    this.props.history.push('/profile');
  }

  render() {
    const { match, user, items, listDataLoading, commentsLoading } = this.props;
    const { listData, comments, matches } = this.state;

    const EditButton = () => (
      <button
        className="edit-btn mb-2"
        style={{ fontSize: '.9rem' }}
        onClick={ this.handleEdit }
      >
        <FontAwesomeIcon icon={["far","edit"]} />
      </button>
    )

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
              items={ listData.items }
              getListData={ this.getListData }
            />
          </div>
        )
      }
    }

    const Statement = () => !match.params.username
      ? <EditableStatement />
      : <UserStatement
          username={ match.params.username }
          statement={ listData.statement }
          getListData={ this.getListData }
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
              <Affinities matches={ matches }/>
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
            <CommentColumn
              comments={ comments }
              getComments={ this.getComments }
              loading={ commentsLoading }
            />
          </CardWrapper>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  user: PropTypes.object,
  isAuthenticated: PropTypes.bool.isRequired,
  open: PropTypes.bool.isRequired,
  comments: PropTypes.array
};

const mapStateToProps = state => ({
  user: state.user,
  isAuthenticated: state.isAuthenticated,
  open: state.open,
  items: state.items,
  listDataLoading: state.listDataLoading,
  commentsLoading: state.commentsLoading
});

const mapDispatchToProps = dispatch => ({
  setListDataLoading,
  setCommentsLoading,
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile));
