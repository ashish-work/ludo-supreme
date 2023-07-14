export default interface FirebaseServiceInterface {
    signInWithEmailAndPassword(email: string, password: string);
    addLoggedInUser(userId:String);
    getWaitingRoomsSync();
    createUserWithEmailAndPassword(email: string, password: string);
    getGameIdSync(userId:string);
    getCurrentTurnSync(gameId:string);
    listenTurnChange(gameId, callback:(snapshot)=>any);
    getGamePlayersSync(gameId:string);
    updatePlayerMove(gameId:string, userId:string, move:number);
    updateTurn(gameId:string, userId);
    listenMoveChange(gameId:string, userId:string, callback:(snapshot)=>any);
}