import React from 'react';
import PropTypes from 'prop-types';
import "./HomeCard.css";
import { Card, CardText, CardBody, CardTitle, CardImg } from 'reactstrap';

// class changed into function to speed up optimization

const HomeCard = (props) => {
  const { title, description } = props;

  // let cardImg = "";
  // if (props.title === "Top Movie List") {
  //   cardImg = <CardImg top src='' alt="Top Movie List" width="100%" />;
  // } else if (props.title === "Most Visited Lists") {
  //   cardImg = <CardImg top src='' alt="Most Visited Lists" width="100%" />;
  // } else if (props.title === "Numbers") {
  //   cardImg = <CardImg top src='' alt="numbers" width="100%" />;
  // }

  return (
    <Card className="card my-2">
      {/* {cardImg} */}
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

