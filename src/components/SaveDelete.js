import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteList, saveList } from '../redux/actions';

class SaveDelete extends Component {

  render() {
    const { saveList, deleteList } = this.props;

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

const mapStateToProps = state => ({
  list: state.list
});

const mapDispatchToProps = dispatch => ({
  deleteList: () => dispatch(deleteList()),
  saveList: () => dispatch(saveList())
});

export default connect(mapStateToProps, mapDispatchToProps)(SaveDelete);