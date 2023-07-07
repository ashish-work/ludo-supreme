
const initialState = {
    cells: [], 
    move: 0,
    turn: ""
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
        case "UPDATE_TURN":
            return {
                ...state,
                turn: action.payload.id
            }
        case "DICE_ROLL":
            return {
                ...state,
                move: action.payload.move
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