export const UPDATE_TURN = 'UPDATE_TURN'
export const UPDATE_MOVE = 'UPDATE_MOVE'
export const ADD_PLAYERS = 'ADD_PLAYERS'
export const INIT_GAME = 'INIT'

export const updateTurn = (message) => ({
    type: UPDATE_TURN,
    payload:message
})


export const updateMove = (message) => ({
    type: UPDATE_MOVE,
    payload: message
})

// export const addPlayers = (message) => ({
//     type: UPDATE_MOVE,
//     payload: message
// })


export const initGame = (message) => ({
    type: INIT_GAME,
    payload: message
})