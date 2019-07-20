import React from 'react';
import PropTypes from 'prop-types';
import { Row } from 'react-bootstrap';

import "./HomeCard.css";

const HomeCard = ({
  title,
  description = '',
}) => (
  <Row className="my-2 shadow mx-1">
    <div className="card-title1 w-100 m-0 bg-red text-white pt-2 pl-4 p-1">
      { title }
    </div>
    <div className="bg-light1 w-100">
      <p className="card-text1 p-4">
        { description }
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nostrum quisquam alias quam?
      </p>
    </div>
  </Row>
);

HomeCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default HomeCard;

