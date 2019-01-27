import React, { Component } from 'react';
import { connect } from 'react-redux';

class Description extends Component {
  render() {

    return (
      <div className="description">
        <textarea
          className="textarea"
          name="description"
          id=""
          cols="80"
          rows="20"
          placeholder="Write your description here..."
        // value={this.props.listDescript}
        >
        </textarea>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  listDescript: state.listDescript
})

export default connect(mapStateToProps)(Description);