import FirebaseServiceInterface from "./firebaseServiceInterface";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../FirebaseConfig.js";
import {signInWithEmailAndPassword, createUserWithEmailAndPassword} from 'firebase/auth';
import {set, ref, child, get, query, onValue} from 'firebase/database';
class FirebaseService implements FirebaseServiceInterface{
    signInWithEmailAndPassword(email, password){
        return signInWithEmailAndPassword(FIREBASE_AUTH, email, password)
    }

    addLoggedInUser(userId) {
        set(child(ref(FIREBASE_DB, "loggedInUsers"), userId), {
            title: "test adding a user",
        })
    }

    async getWaitingRoomsSync(){
        const snapshot = await get(query(ref(FIREBASE_DB, 'waitingRoom')))
        const data = snapshot.val()
        return data
    }

    createUserWithEmailAndPassword(email, password){
        return createUserWithEmailAndPassword(FIREBASE_AUTH, email, password)
    }

    async getGameIdSync(userId){
        const snapshot = await get(query(child(ref(FIREBASE_DB, 'users'), userId)))
        return snapshot.val()["game"]
    }

    async getCurrentTurnSync(gameId){
        const turnRef = child(child(ref(FIREBASE_DB, 'games'), gameId), 'turn')
        const snapshot = await get(query(turnRef))
        return snapshot.val()
    }

    listenTurnChange(gameId, callback){
        const turnRef = child(child(ref(FIREBASE_DB, 'games'), gameId), 'turn')
        onValue(turnRef, (snapshot) => callback(snapshot))
    }

    async getGamePlayersSync(gameId){
        const snapshot = await get(query(child(ref(FIREBASE_DB, 'game'), gameId)))
        return snapshot.val()["players"]
    }

    updatePlayerMove(gameId, userId, diceMove){
        set(child(child(child(ref(FIREBASE_DB, 'games'), gameId), userId), 'move'), {
            "move": diceMove
          })
    }

    updateTurn(gameId, userId){
        set(child(child(ref(FIREBASE_DB, 'games'), gameId), 'turn'),userId)
    }

    listenMoveChange(gameId, userId, callback){
        const listener = onValue(child(child(child(ref(FIREBASE_DB, 'games'), gameId), userId), 'move'), (snapshot) => callback(snapshot))
        return listener
    }
}

const FirebaseServiceInstance = new FirebaseService()

export default FirebaseServiceInstance