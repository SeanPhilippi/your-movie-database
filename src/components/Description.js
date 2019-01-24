import React, { Component } from 'react';

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
        >
        </textarea>
      </div>
    )
  }
}

export default Description;