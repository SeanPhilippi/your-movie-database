import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setDescript } from '../../redux/actions';
import './Description.css';

class Description extends Component {
  render() {
    const {
      setDescript,
      listDescript,
    } = this.props;

    return (
      <div className="description">
        <textarea
          className="textarea"
          name="description"
          cols="80"
          rows="20"
          placeholder="Write your description here..."
          onChange={e => setDescript(e.target.value)}
          value={listDescript}
        >
        </textarea>
      </div>
    )
  }
}

Description.propTypes = {
  listDescript: PropTypes.string.isRequired,
  setDescript: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  listDescript: state.listDescript,
});

const mapDispatchToProps = dispatch => ({
  setDescript: text => dispatch(setDescript(text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Description);
