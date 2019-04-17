import React from 'react';
import PropTypes from 'prop-types';
import "./HomeCard.css";
import { Card, CardText, CardBody, CardTitle, CardImg } from 'reactstrap';

// class changed into function to speed up optimization

const HomeCard = (props) => {
  const { title, description } = props;

  // let cardImg = "";
  // if (props.title === "YMDB Top Movies") {
  //   cardImg = <CardImg top src='' alt="YMDB Top Movies" width="100%" />;
  // } else if (props.title === "Most Visited Lists") {
  //   cardImg = <CardImg top src='' alt="Most Visited Lists" width="100%" />;
  // } else if (props.title === "Numbers") {
  //   cardImg = <CardImg top src='' alt="numbers" width="100%" />;
  // }

  return (
    <Card className="card">
      {/* {cardImg} */}
      <CardBody>
        <CardTitle className="cardTitle">{title}</CardTitle>
        <CardText className="cardText">{description}</CardText>
      </CardBody>
    </Card>
  );
};

HomeCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
}

export default HomeCard;

