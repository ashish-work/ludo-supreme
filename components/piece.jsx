
import { useState, useEffect } from 'react'
import { COLORS, PieceProps, Pos } from '../stores/types'
import { BLUE_PIECE_PATH, GREEN_PIECE_PATH, RED_PIECE_PATH, YELLOW_PIECE_PATH } from '../stores/constants'
import { Animated, StyleSheet, View } from 'react-native'
import React from 'react'
import { useSelector, connect } from 'react-redux'
import { getTurn, getCells, getMove, getTurnNumber, getUserId, getGameId, getOpponentUserId } from '../stores/reducers/board';
import { FIREBASE_DB } from '../FirebaseConfig'
import { ref, onValue, child, get, query, set } from 'firebase/database'
import { getCurrentMove, getCurrentTurn } from '../stores/reducers/gameState'


const mapStateToProps = state => ({
  ...state.pieces
});

const mapDispatchToProps = dispatch => ({
  onUpdatePos: payload => dispatch({ type: 'UPDATE_CURR_POS', payload }),
  updateTurn: () => dispatch({ type: 'UPDATE_TURN' })
});

const Piece = (props) => {
  const pieceProps = props.props
  const uid = props.uid
  let path = []
  const [currPos, setCurrPos] = useState(pieceProps.startPos)
  const [moves, setMoves] = useState([])
  const cellSelector = useSelector(getCells)
  // const diceMove = useSelector(getMove)
  // const turnNumber = useSelector(getTurnNumber)
  const userId = useSelector(getUserId)
  // const gameId = useSelector(getGameId)
  const [animation] = useState(new Animated.ValueXY({ x: currPos.x, y: currPos.y }));
  const providedStyle = pieceProps.color == COLORS.YELLOW ? styles.dot : styles.dotRed

  const currentTurn = useSelector(getCurrentTurn)
  const currentMove = useSelector(getCurrentMove)

  useEffect(() => {
    Animated.sequence(moves).start();
    setMoves([])
  }, [currPos])

  useEffect(()=>{
    console.log('currentTurn', currentTurn)
    if(uid==currentTurn){
      move(currentMove)
    }
  }, [currentTurn, currentMove])

  const populatePath = () => {
    switch (pieceProps.color) {
      case COLORS.RED:
        path = RED_PIECE_PATH
        break
      case COLORS.BLUE:
        path = BLUE_PIECE_PATH
        break
      case COLORS.GREEN:
        path = GREEN_PIECE_PATH
        break
      case COLORS.YELLOW:
        path = YELLOW_PIECE_PATH
        break
    }
  }

  const move = (diceNumber) => {
    let currIndex = path.indexOf(currPos.cellNumber)
    let destIndex = (currIndex + diceNumber) % path.length
    const cellMap = cellSelector
    if (cellMap) {
      let destCell = null
      for (let i = currIndex + 1; i <= destIndex; i++) {
        destCell = cellMap.filter((cell) => cell.index == path[i])[0]
        const move = Animated.timing(animation, {
          toValue: { x: destCell.x, y: destCell.y },
          duration: 500,
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
        if (canCapture(destCell)) {
          capture(destCell)
        }
      }

      //updateCell
    }
  }

  const canCapture = (cell) => {
    if (cell.isSafe) {
      return false
    }

    if (cell.pieces) {
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
          providedStyle,
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
  dotRed: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'red',
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(Piece)