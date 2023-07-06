import React, { useState, useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, Easing, Text } from 'react-native';
import Cell from './cell'


const GRID_SIZE = 5; // Define the size of the grid
const BOX_SIZE = 25; // Define the size of each box in the grid
interface ICell {
  x: number,
  y: number,
  isSafe: boolean,
  index: number,
}

interface GameBoardProps {
  cellMapHandler: any
}

export default function GameBoard(props:{props:GameBoardProps}) {
    const [boardCells, setCells] = useState([])
    const gameBoardProps = props.props
    // Generate the box positions for the grid
  useEffect(() => {
    const cells = []
    const cellMap = {}
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
        cell = <Cell props={cellProps}></Cell>
        cells.push(cell)
        cellMap[index] = cellProps
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
        cell = <Cell props={cellProps}></Cell>
        cellMap[index] = cellProps
        cells.push(cell)
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
        cell = <Cell props={cellProps}></Cell>
        cellMap[index] = cellProps
        cells.push(cell)
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
        cell = <Cell props={cellProps}></Cell>
        cellMap[index] = cellProps
        cells.push(cell)
        index += 1
      }
    }
    setCells(cells)
    gameBoardProps.cellMapHandler(cellMap)

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