import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setStatement } from '../../redux/actions';

class UserStatement extends Component {
  render() {
    const {
      setStatement,
      statement,
    } = this.props;

    return (
      <textarea
        className="w-100 my-3"
        name="user statement"
        rows="10"
        placeholder="Write your statement here..."
        onChange={ e => setStatement(e.target.value) }
        value={ statement }
      >
      </textarea>
    )
  }
}

UserStatement.propTypes = {
  statement: PropTypes.string.isRequired,
  setStatement: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  statement: state.statement,
});

const mapDispatchToProps = dispatch => ({
  setStatement: text => dispatch(setStatement(text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserStatement);
