import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setDescript } from '../../redux/actions';
import './Description.css';

class Description extends Component {
  render() {
    const {
      setDescript,
      statement,
    } = this.props;

    return (
      <div className="description bg-light1 my-2 d-flex flex-column align-items-center">
        <div className="card-title1">
          User Statement
        </div>
        <textarea
          className="textarea my-3"
          name="description"
          rows="10"
          placeholder="Write your statement here..."
          onChange={ e => setDescript(e.target.value) }
          value={ statement }
        >
        </textarea>
      </div>
    )
  }
}

Description.propTypes = {
  statement: PropTypes.string.isRequired,
  setDescript: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  statement: state.statement,
});

const mapDispatchToProps = dispatch => ({
  setDescript: text => dispatch(setDescript(text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Description);
