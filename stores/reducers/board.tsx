
import {UPDATE_TURN, UPDATE_MOVE, ADD_PLAYERS} from '../actions/gameActions'
const initialState = {
    cells: [], 
    move: 0,
    turn: 0,
    turnNumber: 0,
    userId: "",
    gameId: "",
    opponentUserId: "",
    currentTurn: "",
    players: []
}

export const board = (state = initialState, action) =>{
    switch(action.type) {
        case "ADD_CELL":
            if(state.cells.filter((cell) => cell.index ==action.payload.index)){
                return {
                    ...state,
                    cells: [...state.cells, action.payload]
                }
            }
            return state
        case "UPDATE_CELL_PIECE":
            const payload = action.payload
            const cellIndex = payload.index
            let selectedCell = state.cells.filter((cell) => cell.index == cellIndex)[0]
            if(selectedCell.isSafe){
                selectedCell = {
                    ...selectedCell,
                    pieces: [...selectedCell.pieces, payload.piece]
                }
            }
        case "DICE_ROLL":
            return {
                ...state,
                move: action.payload.move,
                turnNumber: state.turnNumber + 1
            }
        case "SET_USER":
            return {
                ...state,
                userId: action.payload.userId
            }
        case "SET_GAME_ID":
            return {
                ...state,
                gameId: action.payload.gameId
            }
        case "SET_OPPONENT_USER_ID":
            return {
                ...state,
                opponentUserId: action.payload.opponentUserId
            }
        case ADD_PLAYERS:
            return {
                ...state,
                players: action.payload.players
            }
        default:
            return state
    }
}

export const getCells = (state) => {
    return state.board.cells
}

export const getMove = (state) => {
    return state.board.move
}


export const getTurn = (state) => {
    return state.board.turn
}

export const getTurnNumber = (state) => {
    return state.board.turnNumber
}


export const getUserId = (state) => {
    return state.board.userId
}

export const getGameId = (state) => {
    return state.board.gameId
}

export const getOpponentUserId = (state) => {
    return state.board.opponentUserId
}

export const getCurrentTurn = (state) => {
    return state.board.currentTurn
}

export const getPlayers = (state) => {
    return state.board.players
}