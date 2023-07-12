
const initialState = {
    cells: [], 
    move: 0,
    turn: 0,
    turnNumber: 0
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
        case "UPDATE_TURN":
            const newTurn = state.turn === 1 ? 0: 1
            return {
                ...state,
                turn: newTurn
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