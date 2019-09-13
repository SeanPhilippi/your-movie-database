import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import CommentColumn from './CommentColumn';
import EditableStatement from './EditableStatement';
import UserStatement from './UserStatement';
import SaveDelete from './SaveDelete';
import SortableList from './SortableList';
import CardWrapper from './CardWrapper';
import Search from './Search';
import ViewableList from './ViewableList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { setEditing } from '../redux/actions';

class Profile extends PureComponent  {
  state = {
    listData: {
      username: '',
      items: [],
      statement: ''
    },
    comments: []
  };

  componentDidMount() {
    const { username } = this.props.match.params;
    console.log('visited list?', username ? true : false)
    if (username) {
      console.log('fetching visited listData in Profile...')
      fetch(`/api/movies/${ username }/list`)
        .then(res => res.json())
        .then(data => {
          if (data) {
            const fetchedListData = {
              username: data.username,
              items: data.items,
              statement: data.statement
            };
            this.setState({
              ...this.state,
              listData: { ...fetchedListData }
            });
          }
        }).catch(console.log);

      // fetch(`/api/comments/${ username || this.props.user.username }`)
      //   .then(res => res.json())
      //   .then(data => {
      //     console.log('comment data on mount', data)
      //     if (data) {
      //       this.setState({
      //         ...this.state,
      //         comments: [...data.comments]
      //       });
      //     }
      //   })
    }
  }

  componentDidUpdate(prevProps) {
    const { open, match } = this.props;
    if (prevProps.open !== open) {
      fetch(`/api/movies/${ match.params.username }/list`)
        .then(res => res.json())
        .then(data => {
          if (data) {
            const fetchedListData = {
              username: data.username,
              items: data.items,
              statement: data.statement
            };
            this.setState({ listData: fetchedListData });
          }
        })
    }
  };

  handleEdit = () => {
    const { setEditing, history } = this.props;
    setEditing();
    history.push('/profile');
  }

  render() {
    const { match, user } = this.props;
    const { listData, comments } = this.state;
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
                !match.params.username
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
                    <div className="d-flex justify-content-end">
                      {
                        user.username === match.params.username
                        && <button
                            className="edit-btn mb-2"
                            style={{ fontSize: '.9rem' }}
                            onClick={ this.handleEdit }
                          >
                            <FontAwesomeIcon icon={["far","edit"]} />
                          </button>
                      }
                    </div>
                    <ViewableList items={ listData.items }/>
                  </div>
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
                !match.params.username
                ? <EditableStatement />
                : <UserStatement username={ match.params.username } statement={ listData.statement }/>
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
            <CommentColumn comments={ comments }/>
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
  editing: PropTypes.bool.isRequired,
  addError: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  isAuthenticated: state.isAuthenticated,
  open: state.open,
  editing: state.editing,
  addError: state.addError,
});

const mapDispatchToProps = dispatch => ({
  setEditing: () => dispatch(setEditing()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile));
