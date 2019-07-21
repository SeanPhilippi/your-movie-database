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
      <div className="description bg-light1 my-2 d-flex flex-column align-items-center">
        <div class="card-title1">
          User Statement
        </div>
        <textarea
          className="textarea my-3"
          name="description"
          rows="10"
          placeholder="Write your statement here..."
          onChange={ e => this.props.setDescript(e.target.value) }
          value={ this.props.listDescript }
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