import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import "./CardWrapper.css";

const CardWrapper = ({
  icon,
  title,
  color,
  link,
  children
}) => (
  <div className={`card-wrapper ${color}`}>
    <div className="wrapper-icon">
      { icon }
    </div>
    <div className="wrapper-title">
      { link ? <Link to={`/${link}`}> { title } </Link> :  title }
    </div>
    <div className="wrapper-body w-100">
      { children }
    </div>
  </div>
);

CardWrapper.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  // link: PropTypes.string
};

export default CardWrapper;