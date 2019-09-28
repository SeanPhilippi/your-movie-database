import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { setEditing } from '../../redux/actions';

const EditButton = ({ setEditing }) => (
  <button
    className="edit-btn mb-2"
    style={{ fontSize: '.9rem' }}
    onClick={ () => setEditing(true) }
  >
    <FontAwesomeIcon icon={["far","edit"]} />
  </button>
);

const mapDispatchToProps = dispatch => ({
  setEditing: bool => dispatch(setEditing(bool)),
});

export default connect(null, mapDispatchToProps)(EditButton);