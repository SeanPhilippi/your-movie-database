import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IoIosFlashlight } from 'react-icons/io';

const CardWrapper = ({
  icon,
  title,
  color,
  link,
  children,
  rotate,
  marginTopVal
}) => (
  <div className={`card-wrapper mb-3 shadow bg-${ color } ${ marginTopVal && `mt-${marginTopVal}` }`}>
    <div className="wrapper-header d-flex align-items-center">
      {
        !(title === 'spotlight on a user')
        ? <FontAwesomeIcon
            icon={ icon }
            transform={ rotate && { rotate } }
            className="wrapper-icon mr-3"
          />
        : <IoIosFlashlight className="wrapper-icon-ion mr-2" />

    }
      {
        link
        ? <div><NavLink className="link" to={`/${ link }`}> { title } </NavLink></div>
        :  <div>{ title }</div>
      }
    </div>
    <div className="wrapper-body w-100">
      { children }
    </div>
  </div>
);

CardWrapper.propTypes = {
  icon: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ]),
  title: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  children: PropTypes.object,
  rotate: PropTypes.number,
  marginTopVal: PropTypes.string,
  // link: PropTypes.string
};

export default CardWrapper;