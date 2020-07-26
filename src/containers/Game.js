import React, { Component } from 'react';
import { View, Button, StyleSheet, Dimensions, Text } from 'react-native';
import ChessBoard from '../components';

const { width } = Dimensions.get('window');

const POSSIBLE_MOVES = [
  { to: 'g3', from: 'g2' },
  { to: 'd4', from: 'd2' },
  { to: 'f3', from: 'g1' },
  { to: 'c4', from: 'c2' },
  { to: 'e4', from: 'e2' }
]

export default class Game extends Component {
  constructor(props) {
    super(props);
  }

  makeRandomMove = () => {
    const randomIndex = Math.floor(Math.random() * POSSIBLE_MOVES.length);
    const randomMove = POSSIBLE_MOVES[randomIndex];

    this.board.movePiece(randomMove.to, randomMove.from);
  };

  resetGame = () => {
    this.board.resetBoard();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Chess
        </Text>
        <ChessBoard
          ref={board => this.board = board}
          size={width - (width / 6)}
        />
        <View style={styles.buttonContainer}>
          <Button title={"Reset Board"} onPress={this.resetGame} />
          <Button title={"Show Random Opening"} onPress={this.makeRandomMove} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
    padding: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: width - 40,
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});
