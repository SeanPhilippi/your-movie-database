import React from 'react';
import PropTypes from 'prop-types';
import { sortableHandle } from 'react-sortable-hoc';
import img from '../../../images/grippy.png';

const DragHandle = sortableHandle(({ sortIndex }) => {
  return (
    <div
      className="grip d-flex align-items-center justify-content-between mr-2"
      style={{ width: '3.1rem' }}
    >
      <img
        className="ml-2"
        alt="grip handle"
        style={{ width: '.4rem', height: '1.2rem' }}
        src={ img }
      >
      </img>
      <div className="text-right">
        <span className="number">{ sortIndex + 1 }</span>
      </div>
    </div>
  );
});

DragHandle.propTypes = {
  sortIndex: PropTypes.number.isRequired
};

export default DragHandle;