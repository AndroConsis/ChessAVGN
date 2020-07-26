import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';

const BLACK = '#2e2e2e';
const WHITE = '#FFFFFF';

export default class Board extends Component {
  static propTypes = {
    size: PropTypes.number.isRequired,
    rowIndex: PropTypes.number.isRequired,
    position: PropTypes.string.isRequired,
    columnName: PropTypes.string.isRequired,
    columnIndex: PropTypes.number.isRequired,
  };

  render() {
    const {
      size,
      rowIndex,
      columnIndex
    } = this.props;
    const isBlack = (rowIndex + columnIndex) % 2 === 0;
    let backgroundColor = isBlack ? WHITE : BLACK;

    return (
        <View
          style={[
            styles.container,
            {
              backgroundColor,
              width: size,
              height: size,
            },
          ]}
        >
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  }
});
