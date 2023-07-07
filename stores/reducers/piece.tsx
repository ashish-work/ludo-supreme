const initialState = {
    pieces: []
}

export default (state=initialState, action) => {
    switch(action.type) {
        case "ADD_PIECE":
            if(state.pieces.filter((piece) => piece.index ==action.payload.index)){
                return {
                    ...state,
                    pieces: [...state.pieces, action.payload]
                }
            }
            return state
        case "UPDATE_CURR_POS":
            const payload = action.payload
            const selectedPiece = state.pieces.filter((piece) => piece.id == payload.id)
            const prevPos = selectedPiece.currPos
            const selectedCellIndex = state.cells.findIndex(cell => cell.index == prevPos.index)
            let selectedCell = state.cells.filter((cell)=> cell.index == prevPos.index)
            let pieces = selectedCell.pieces.filter((pieceId) => pieceId != payload.id)
            selectedCell = {
                ...selectedCell,
                pieces: [...pieces]
            }
            selectedPiece.currPos = payload.currPos
            return {
                ...state,
                pieces: [...state.pieces, selectedPiece],
                cells: [
                    state.cells.splice(0, selectedCellIndex),
                    selectedCell,
                    state.cells.splice(selectedCellIndex+1)
                ]
            }
        default:
            return state
    }
}