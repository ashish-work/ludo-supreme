import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Pressable } from 'react-native';
import GameBoard from './board';
import Piece from './piece';
import { COLORS } from '../stores/types';
import { connect, useSelector } from 'react-redux';
import DiceOne from '../assets/One.png'
import DiceTwo from '../assets/Two.png'
import DiceThree from '../assets/Three.png'
import DiceFour from '../assets/Four.png'
import DiceFive from '../assets/Five.png'
import DiceSix from '../assets/Six.png'
import { getUserId } from '../stores/reducers/board';
import { getPlayers, getCurrentTurn } from '../stores/reducers/gameState';
import { ref, child, get, query, onValue } from 'firebase/database'
import { FIREBASE_DB } from '../FirebaseConfig';
import { useFirebase } from '../providers/firebase';
let count = 1

const mapStateToProps = state => ({
  ...state.gameState
});

const mapDispatchToProps = dispatch => ({
  onMove: payload => dispatch({ type: 'DICE_ROLL', payload }),
  addPiece: payload => dispatch({ type: 'ADD_PIECE', payload }),
});

const Dice = ({ imageUrl, pressHandler, disableDiceRoll }) => {
  return (
    <View style={styles.diceContainer}>
      <Pressable onPress={pressHandler} disabled={disableDiceRoll}>
        <Image style={styles.diceImage} source={imageUrl} />
      </Pressable>
    </View>
  )
}
function Game(props) {
  const [move, setMove] = useState()
  const [diceImage, setDiceImage] = useState(DiceOne)
  const [disableDice, setDisableDice] = useState(false)
  const players = useSelector(getPlayers)
  const currentTurn = useSelector(getCurrentTurn)
  const userId = useSelector(getUserId)
  const firebaseService = useFirebase()


  let count = 0

  const rollDiceOnTap = () => {

    let randomNumber = Math.floor(Math.random() * 6) + 1;
    switch (randomNumber) {
      case 1:
        setDiceImage(DiceOne);
        setMove(Date.now().toString())
        break;
      case 2:
        setDiceImage(DiceTwo);
        setMove(Date.now().toString())
        break;
      case 3:
        setDiceImage(DiceThree);
        setMove(Date.now().toString())
        break;
      case 4:
        setDiceImage(DiceFour);
        setMove(Date.now().toString())
        break;
      case 5:
        setDiceImage(DiceFive);
        setMove(Date.now().toString())
        break;
      case 6:
        setDiceImage(DiceSix);
        setMove(Date.now().toString())
        break;
    }
    props.onMove({
      move: randomNumber
    })

  }

  let yellowPieceProps = {
    color: COLORS.YELLOW,
    startPos: {
      x: 150,
      y: 450,
      cellNumber: 58,
    },
    id: 0,
    move: move
  }
  let redPieceProps = {
    color: COLORS.RED,
    startPos: {
      x: 200,
      y: 150,
      cellNumber: 31,
    },
    id: 1,
    move: move
  }

  props.addPiece(yellowPieceProps)
  props.addPiece(redPieceProps)

  return (
    <View style={styles.container}>
      <GameBoard></GameBoard>
      <Piece props={yellowPieceProps} uid="Ck9DVkbcmjRetQIwGYZE9ZqHcT23" key={0}></Piece>
      <Piece props={redPieceProps} uid="yE4QLctMLtb021UuNkirMtwcoEW2" key={1}></Piece>
      <Dice imageUrl={diceImage} pressHandler={rollDiceOnTap} disableDiceRoll={disableDice}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'white',
  },
  diceContainer: {
    margin: 50,
    marginBottom: 200,
    justifyContent: 'flex-end',
  },
  diceImage: {
    width: 50,
    height: 50,
  },
  rollDiceBtnText: {
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: '#E5E0FF',
    fontSize: 16,
    textTransform: 'uppercase',
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(Game)