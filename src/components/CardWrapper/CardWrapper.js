import React from 'react';
import PropTypes from 'prop-types';

import "./CardWrapper.css";

const CardWrapper = ({
  icon,
  title,
  color,
  children
}) => (
  <div className="card-wrapper">
    <div className="wrapper-icon">
      { icon }
    </div>
    <div className="wrapper-title">
      { title }
    </div>
    <div className="wrapper-body w-100 p-4">
      { children }
    </div>
  </div>
);

CardWrapper.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  bgColor: PropTypes.string.isRequired
};

export default CardWrapper;