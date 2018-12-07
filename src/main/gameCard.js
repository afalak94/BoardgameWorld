import React from 'react';
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button
} from 'reactstrap';
import { Link } from 'react-router-dom';

const GameCard = props => {
  return (
    <div>
      <Card className='home__card--size'>
        <CardImg
          top
          src={props.imgUrl}
          alt='Card image cap'
          className='cardImg'
        />
        <CardBody>
          <CardTitle>{props.name}</CardTitle>
          <CardSubtitle>Score: {props.score}</CardSubtitle>
          <Button tag={Link} to={'/game/' + props.id}>
            View more
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default GameCard;
