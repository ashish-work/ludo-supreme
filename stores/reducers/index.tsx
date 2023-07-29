import {combineReducers} from 'redux'
import {board} from './board'
import {gameState} from './gameState'
import piece from './piece'

export default combineReducers({
    board: board,
    piece: piece,
    gameState: gameState
})

