
import { useState, useRef, useEffect } from 'react'
import { COLORS, PieceProps, Pos } from '../stores/types'
import { BLUE_GOTI_PATH, GREEN_GOTI_PATH, RED_GOTI_PATH, YELLOW_GOTI_PATH } from '../stores/constants'
import { Animated, StyleSheet, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { getCells, getMove } from '../stores/reducers/board';

const Piece = (props: { props: PieceProps }) => {
  const pieceProps = props.props
  let path: (number)[] = []
  const [currPos, setCurrPos] = useState(pieceProps.startPos)
  const [animation] = useState(new Animated.ValueXY({ x: currPos.x, y: currPos.y }));
  const [moves, setMoves] = useState([])
  const cellSelector = useSelector(getCells)
  const diceMove = useSelector(getMove)

  useEffect(() => {
    populatePath()
    move(diceMove)
  }, [diceMove])

  useEffect(() => {
    Animated.sequence(moves).start();
    setMoves([])
  }, [currPos])

  const populatePath = () => {
    switch (pieceProps.color) {
      case COLORS.RED:
        path = RED_GOTI_PATH
        break
      case COLORS.BLUE:
        path = BLUE_GOTI_PATH
        break
      case COLORS.GREEN:
        path = GREEN_GOTI_PATH
        break
      case COLORS.YELLOW:
        path = YELLOW_GOTI_PATH
        break
    }
  }

  const move = (diceNumber: number) => {
    let currIndex = path.indexOf(currPos.cellNumber)
    let destIndex = (currIndex + diceNumber) % path.length
    const cellMap = cellSelector
    if (cellMap) {
      let destCell = null
      for (let i = currIndex + 1; i <= destIndex; i++) {
        destCell = cellMap.filter((cell) => cell.index == path[i])[0]
        const move = Animated.timing(animation, {
          toValue: { x: destCell.x, y: destCell.y },
          duration: 700,
          useNativeDriver: true,
        })
        moves.push(move)
      }
      setMoves(moves)
      if (destCell) {
        setCurrPos({
          x: destCell.x,
          y: destCell.y,
          cellNumber: destCell.index
        })
      }
      //updateCell
    }
  }

  const canCapture = (cell) => {
    if(cell.isSafe){
      return false
    }

    if(cell.pieces){
      return true
    }

    return false
  }


  const capture = (cell) => {
    // updatePieceCapture
  }

  return (
    <View>
      <Animated.View
        style={[
          styles.dot,
          {
            transform: [
              { translateX: animation.x },
              { translateY: animation.y }
            ],
          },
        ]}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  dot: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'yellow',
  },
});


export default Piece