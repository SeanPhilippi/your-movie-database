import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteList } from '../redux/actions';

class SaveDelete extends Component {

  // save a list
  handleSave = () => {
    console.log('saving...');
    fetch('/list', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.props.state)
    })
      .then(res => res.json())
      .catch(err => console.log(err))
  }

  handleDelete = () => {
    this.props.deleteList();
    console.log('deleting...');
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