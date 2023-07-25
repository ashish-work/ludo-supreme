import {io} from 'socket.io-client';
import store from '../../stores'
import {initGame, updateMove, updateTurn} from '../../stores/actions/gameActions'
const SERVER_URL = 'https://1a1d-122-172-83-130.ngrok-free.app'

const socket = io(SERVER_URL);

socket.on('init', (message) => {
    console.log('initialize game state', message)
    store.dispatch(initGame(message))
})

socket.on('updateTurn', (message) =>{
    console.log(message)
    store.dispatch(updateTurn(message))
})


socket.on('updateMove', (message)=>{
    console.log('update move', message)
    store.dispatch(updateMove(message))
})

export default socket;