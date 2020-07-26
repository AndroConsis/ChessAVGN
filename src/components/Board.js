import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text, LayoutAnimation, Platform, Dimensions } from 'react-native';

import { Chess } from 'chess.js';

import Square from './Square';
import Piece from './Piece';

const DIMENSION = 8;
const COLUMN_NAMES = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

export default class BoardView extends Component {
  static propTypes = {
    size: PropTypes.number.isRequired,
    color: PropTypes.oneOf(['w', 'b']),
  };

  static defaultProps = {
    size: 320,
  };

  constructor(props) {
    super(props);

    const game = new Chess(FEN);

    this.state = {
      game,
      board: this.createBoardData(game, FEN),
    };
  }

  movePiece = (to, from) => {
    const { game } = this.state;
    const moveConfig = {
      to,
      from: from
    };

    game.move(moveConfig);

    this.setState({
      board: this.createBoardData(game),
    });
  };

  resetBoard = () => {
    const { game } = this.state;
    game.reset();
    this.setState({
      board: this.createBoardData(game),
    })
  }

  createBoardData(game) {
    const board = game.board();
    const squares = [];

    board.forEach((row, rowIndex) => {
      row.forEach((square, columnIndex) => {
        const columnName = COLUMN_NAMES[columnIndex];
        const position = `${columnName}${DIMENSION - rowIndex}`;
        const type = square ? square.type : '';
        const color = square ? square.color : '';

        squares.push({
          ...square,
          position,
          columnName,
          rowIndex,
          columnIndex
        });
      });
    });

    return squares;
  }

  renderSquares() {
    const { size } = this.props;
    const { board } = this.state;
    const squareSize = size / DIMENSION;
    const rowSquares = [];

    board.forEach(square => {
      const {
        rowIndex,
        columnIndex,
        columnName,
        position
      } = square;
      const squareView = (
        <Square
          key={`square_${rowIndex}_${columnIndex}`}
          size={squareSize}
          rowIndex={rowIndex}
          columnIndex={columnIndex}
          columnName={columnName}
          dimension={DIMENSION}
          position={position}
        />
      );

      if (!rowSquares[rowIndex]) {
        rowSquares[rowIndex] = [];
      }
      rowSquares[rowIndex].push(squareView);
    });

    return rowSquares.map((r, index) => {
      return (
        <View key={`row_${index}`} style={styles.row}>
          {r}
        </View>
      );
    });
  }

  renderPieces() {
    const { size } = this.props;
    const { board } = this.state;

    return board.map(square => {
      const {
        type,
        color,
        rowIndex,
        columnIndex,
        position,
      } = square;
      if (type) {
        return (
          <Piece
            key={`piece_${rowIndex}_${columnIndex}`}
            type={type}
            color={color}
            rowIndex={rowIndex}
            columnIndex={columnIndex}
            pieceSize={size / DIMENSION}
            position={position}
          />
        );
      }
      return null;
    });
  }

  renderColLabels = () => {
    const { size } = this.props;
    const squareSize = size / DIMENSION;

    return <View style={[styles.row]} >
      {COLUMN_NAMES.map((col, index) => <Text
        key={index}
        style={[{
          width: squareSize,
          height: squareSize / 3,
          fontSize: squareSize / 4,
        }, styles.borderLabel]}>{col}</Text>)}
    </View>
  }

  renderRowLabels = (isLeft) => {
    const { size } = this.props;
    const squareSize = size / DIMENSION;
    const rowLabels = [];
    for (let index = 0; index < DIMENSION; index++) {
      const label = <View
        key={index}
        style={[{
          width: squareSize / 3,
          height: squareSize,
        }, styles.rowLabel]}>
        <Text
          style={[{ fontSize: squareSize / 4 }, styles.borderLabel]}>
          {DIMENSION - index}
        </Text>
      </View>
      rowLabels.push(label)
    }

    return <View
      style={{
        position: 'absolute',
        top: squareSize / 3,
        left: isLeft ? -(squareSize / 3) : null,
        right: isLeft ? null : -(squareSize / 3)
      }}>
      {rowLabels}
    </View>
  }

  renderBackgroud = () => {
    const { size } = this.props;

    return <View
      style={{
        backgroundColor: '#2e2e2e',
        height: size + (size / 12),
        width: size + (size / 12),
        left: -(size / 24),
        position: 'absolute',
      }}>
    </View>
  }

  render() {
    const { style } = this.props;

    return (
      <View style={[styles.container, style]}>
        {this.renderBackgroud()}
        {this.renderColLabels()}
        {this.renderRowLabels(true)}
        <View style={styles.board}>
          {this.renderSquares()}
          {this.renderPieces()}
        </View>
        {this.renderRowLabels(false)}
        {this.renderColLabels()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  row: {
    flexDirection: 'row',
  },
  borderLabel: {
    textAlign: 'center',
    fontWeight: '600',
    color: "white",
  },
  rowLabel: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
