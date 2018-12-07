import React, { Component } from 'react';
import './App.css';
import GameCard from './gameCard';
import { Container, Row, Col } from 'reactstrap';
import firebase from './firebase.config';
import 'firebase/database';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { boardgames: [] };
  }

  componentWillMount() {
    //get all games from database
    this.database = firebase.database().ref('boardgames/');
    this.database.on('value', snap => {
      this.setState({
        boardgames: snap.val()
      });
      console.log(this.state.boardgames);
    });
  }

  render() {
    return (
      <div className='App'>
        <div>
          <h2>Home screen</h2>
          <Container>
            <Row>
              {this.state.boardgames.map(game => {
                return (
                  <Col xs='4' key={game.id}>
                    <GameCard
                      imgUrl={game.imgUrl}
                      name={game.name}
                      price={game.price}
                      score={game.score}
                      id={game.id}
                    />
                  </Col>
                );
              })}
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default App;
