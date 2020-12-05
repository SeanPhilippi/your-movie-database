import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IoIosFlashlight } from 'react-icons/io';

const CardWrapper = ({
  icon,
  title,
  color,
  link,
  children,
  rotate,
  marginTopVal,
  marginTopValMobile,
}) => (
  <div
    className={`card-wrapper mb-3 shadow bg-${color} mt-sm-${marginTopVal} mt-${marginTopValMobile}`}
  >
    <div className='wrapper-header d-flex align-items-center'>
      {!(title === 'spotlight on a user') ? (
        <FontAwesomeIcon
          icon={icon}
          transform={rotate && { rotate }}
          className='wrapper-icon mr-3'
        />
      ) : (
        <IoIosFlashlight className='wrapper-icon-ion mr-2' />
      )}
      {link ? (
        <Link to={`/${link}`}>
          <div className='text-white'> {title} </div>
        </Link>
      ) : (
        <div>{title}</div>
      )}
    </div>
    <div className='wrapper-body w-100'>{children}</div>
  </div>
);

CardWrapper.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  title: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  rotate: PropTypes.number,
  marginTopVal: PropTypes.string,
  link: PropTypes.string,
};

export default CardWrapper;
