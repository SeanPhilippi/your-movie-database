import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Description.css';

import {
  setDescript, 
} from '../../redux/actions';

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
          onChange={e => this.props.setDescript(e.target.value)}
          value={this.props.listDescript}
        >
        </textarea>
      </div>
    )
  }
}

Description.propTypes = {
  listDescript: PropTypes.string.isRequired,
  setDescript: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  listDescript: state.listDescript, 
})

const mapDispatchToProps = dispatch => ({
  setDescript: text => dispatch(setDescript(text)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Description);