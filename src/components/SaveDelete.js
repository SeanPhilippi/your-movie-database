import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteList, saveList } from '../redux/actions';

class SaveDelete extends Component {

  render() {
    return (
      <div className="save-delete">
        <button c
          lassName="delete-list"
          onClick={() => deleteList()}
        >
          Delete
        </button>
        <button
          className="save-list"
          onClick={() => saveList()}
        >
          Save
        </button>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SaveDelete);