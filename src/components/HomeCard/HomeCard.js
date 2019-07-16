import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardText, CardBody, CardTitle } from 'reactstrap';

import "./HomeCard.css";

const HomeCard = (props) => {
  const { title, description } = props;

  return (
    <Card className="card my-2">
      <CardBody className="p-0">
        <CardTitle className="card-title bg-red text-white pt-2 pl-4 p-1">
          {title}
        </CardTitle>
        <CardText className="card-text p-4">
          {description}
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nostrum quisquam alias quam?
        </CardText>
      </CardBody>
    </Card>
  );
};

HomeCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
}

export default HomeCard;

