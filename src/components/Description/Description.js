import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setStatement } from '../../redux/actions';
import './Description.css';

class Description extends Component {
  render() {
    const {
      setStatement,
      statement,
    } = this.props;

    return (
      <div className="description my-2 d-flex flex-column align-items-center">
        <div className="card-title1">
          User Statement
        </div>
        <textarea
          className="textarea my-3"
          name="description"
          rows="10"
          placeholder="Write your statement here..."
          onChange={ e => setStatement(e.target.value) }
          value={ statement }
        >
        </textarea>
      </div>
    )
  }
}

Description.propTypes = {
  statement: PropTypes.string.isRequired,
  setStatement: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  statement: state.statement,
});

const mapDispatchToProps = dispatch => ({
  setStatement: text => dispatch(setStatement(text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Description);
