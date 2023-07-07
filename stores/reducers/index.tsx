import {combineReducers} from 'redux'
import {board} from './board'
import piece from './piece'

export default combineReducers({
    board: board,
    piece: piece,
})

