import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Cell from './cell'
import { connect } from 'react-redux';


const GRID_SIZE = 5; // Define the size of the grid
const BOX_SIZE = 25; // Define the size of each box in the grid
interface ICell {
  x: number,
  y: number,
  isSafe: boolean,
  index: number,
}

const mapStateToProps = state => ({
  ...state.cells
});

const mapDispatchToProps = dispatch => ({
  onAddCell: payload => dispatch({type: 'ADD_CELL', payload})
});

function GameBoard(props) {
    const [boardCells, setCells] = useState([])
    // Generate the box positions for the grid
  useEffect(() => {
    const cells = []
    let index = 0
    let cell = null
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 6; j++) {
        let cellProps:ICell =  {
          x: (j * BOX_SIZE + 0),
          y: (i * BOX_SIZE + 275),
          isSafe: false,
          index: index,
        }
        cell = <Cell props={cellProps} key={index}></Cell>
        cells.push(cell)
        props.onAddCell(cellProps)
        index += 1
      }
    }
    for (let j = 0; j < 3; j++) {
      for (let i = 0; i < 6; i++) {
        let cellProps:ICell =  {
          x: j * BOX_SIZE + 150,
          y: i * BOX_SIZE + 125,
          isSafe: false,
          index: index,
        }
        cell = <Cell props={cellProps} key={index}></Cell>
        cells.push(cell)
        props.onAddCell(cellProps)
        index += 1
      }
    }

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 6; j++) {
        let cellProps:ICell =  {
          x: j * BOX_SIZE + 225,
          y: i * BOX_SIZE + 275,
          isSafe: false,
          index: index,
        }
        cell = <Cell props={cellProps} key={index}></Cell>
        cells.push(cell)
        props.onAddCell(cellProps)
        index += 1
      }
    }

    for (let j = 0; j < 3; j++) {
      for (let i = 0; i < 6; i++) {
        let cellProps:ICell =  {
          x: j * BOX_SIZE + 150,
          y: i * BOX_SIZE + 350,
          isSafe: true,
          index: index,
        }
        cell = <Cell props={cellProps} key={index}></Cell>
        cells.push(cell)
        props.onAddCell(cellProps)
        index += 1
      }
    }
    setCells(cells)

  }, []);

  return (
    <View>
        {boardCells}
    </View>
  )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      backgroundColor: 'white',
    },
    box: {
      position: 'absolute',
      width: BOX_SIZE,
      height: BOX_SIZE,
      backgroundColor: 'grey',
      borderWidth: 1,
      borderColor: 'black',
    },
    dot: {
      position: 'absolute',
      width: 20,
      height: 20,
      borderRadius: 10,
      backgroundColor: 'blue',
    },
  });



export default connect(mapStateToProps, mapDispatchToProps)(GameBoard);