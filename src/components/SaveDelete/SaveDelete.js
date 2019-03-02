import React, { Component } from 'react';
import './SaveDelete.css';
import { connect } from 'react-redux';
import { deleteList } from '../../redux/actions';

class SaveDelete extends Component {

  // save a list
  handleSave = () => {
    console.log('saving...');
  // update a list
  // TODO:
  // search mlab ymdb collection for list by username
  // if exists, this.handleChange()
  // else POST request logic...
    fetch(`/save/${this.props.state.username}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.props.state)
    })
      .then(res => res.json())
      .catch(err => console.log(err))
  }

  //* not yet tested, look up put requests and check server-side setup
  handleChange = () => {
    fetch(`/update/${this.props.state.username}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.props.state)
    })
      .then(res => res.json())
      .catch(err => console.log(err))
  }

  handleDelete = () => {
    // clearing redux list array
    this.props.deleteList();
    console.log('deleting...');
    // deleting list document tied to user
    const {username} = this.props.state;
    return fetch(`/${username}/delete`, {
      method: 'DELETE'
    })
    .then(res => {
      return res
    }).catch(err => console.error(err))
  }

  render() {

    return (
      <div className="save-delete">
        <button c
          className="delete-list"
          onClick={() => this.handleDelete()}
        >
          Delete
        </button>
        <button
          className="save-list"
          onClick={() => this.handleSave()}
        >
          Save
        </button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  state: state
});

const mapDispatchToProps = dispatch => ({
  deleteList: () => dispatch(deleteList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SaveDelete);