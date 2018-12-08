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
          src={props.game.imgUrl}
          alt='Card image cap'
          className='cardImg'
        />
        <CardBody>
          <CardTitle>{props.game.name}</CardTitle>
          <CardSubtitle>Score: {props.game.score}</CardSubtitle>
          <Button
            tag={Link}
            to={'/game/' + props.game.id}
            className='home__cardBtn--margin'
          >
            View more
          </Button>
          <Button
            className='home__cardBtn--margin'
            onClick={() => props.addToCart(props.game)}
          >
            Add to Cart
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default GameCard;
