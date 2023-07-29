const initialState = {
    players: "",
    currentTurn: "",
    currentMove: 0,
    gameRoomId: ""
}


export const gameState = (state=initialState, action) => {

    switch(action.type){
        case "INIT":
            return {
                ...state,
                players: action.payload.players,
                currentTurn: action.payload.currentTurn,
                currentMove: action.payload.currentMove,
                gameRoomId: action.payload.gameRoomId,
            }
        case "UPDATE_TURN":
            return {
                ...state,
                currentTurn: action.payload
            }
        case "UPDATE_MOVE":
            console.log('update move state', state)
            return {
                ...state,
                currentMove: action.payload
            }
        default:
            return state
    }


}


export const getPlayers = (state)=>{
    return state.gameState.players
}

export const getCurrentTurn = (state) => {
    return state.gameState.currentTurn
}

export const getCurrentMove = (state) => {
    return state.gameState.currentMove
}