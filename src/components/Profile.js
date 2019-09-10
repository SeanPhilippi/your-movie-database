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
      statement: '',
    }
  };

  componentDidMount() {
    console.log('visited list?', this.props.match.params.username ? true : false)
    console.log('username param', this.props.match.params.username)
    if (this.props.match.params.username) {
      console.log('fetching visited listData in Profile...')
      fetch(`/api/movies/${ this.props.match.params.username }/list`)
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
  }

  componentDidUpdate(prevProps) {
    if (prevProps.open !== this.props.open) {
      fetch(`/api/movies/${ this.props.match.params.username }/list`)
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
    this.props.setEditing();
    this.props.history.push('/profile');
  }

  render() {
    return (
      <div className="grid-container bg-light2 mt-4">
        <div className="bg-white">
          <div className="px-4 pt-4 w-100">
            <CardWrapper
              icon={["far", "list-alt"]}
              rotate={ -5 }
              title={`${this.props.match.params.username || this.props.user.username}'s Top Movies`}
              color="tan"
              marginTopVal='0'
            >
              {
                !this.props.match.params.username
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
                      <button
                        className="edit-btn mb-2"
                        style={{ fontSize: '.9rem' }}
                        onClick={ this.handleEdit }
                      >
                        <FontAwesomeIcon icon={["far","edit"]} /> Edit
                      </button>
                    </div>
                    <ViewableList items={ this.state.listData.items }/>
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
                !this.props.match.params.username
                ? <EditableStatement />
                : <UserStatement username={ this.props.match.params.username } statement={ this.state.listData.statement }/>
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
            <CommentColumn />
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
};

const mapStateToProps = state => ({
  user: state.user,
  isAuthenticated: state.isAuthenticated,
  open: state.open,
  editing: state.editing
});

const mapDispatchToProps = dispatch => ({
  setEditing: () => dispatch(setEditing()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile));
