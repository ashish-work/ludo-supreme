import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Pressable } from 'react-native';
import Lottie from 'lottie-react-native';
import GameBoard from './board';
import Piece from './piece';
import { COLORS } from '../stores/types';
import { connect } from 'react-redux';
import DiceOne from '../assets/One.png'
import DiceTwo from '../assets/Two.png'
import DiceThree from '../assets/Three.png'
import DiceFour from '../assets/Four.png'
import DiceFive from '../assets/Five.png'
import DiceSix from '../assets/Six.png'
// import Confetti from '../assets/canfette.json'
let count = 1

const mapStateToProps = state => ({
  ...state.board
});

const mapDispatchToProps = dispatch => ({
  onMove: payload => dispatch({type: 'DICE_ROLL', payload}),
  addPiece: payload => dispatch({type: 'ADD_PIECE', payload})
});

const Dice = ({ imageUrl, pressHandler }) => {
  return (
    <View style={styles.diceContainer}>
      <Pressable onPress={pressHandler}>
        <Image style={styles.diceImage} source={imageUrl} />
      </Pressable>
    </View>
  )
}
function Game(props) {
  const [move, setMove] = useState()
  const [diceImage, setDiceImage] = useState(DiceOne)

  let count = 0

  const rollDiceOnTap = () => {
    let randomNumber = Math.floor(Math.random() * 6) + 1;
    switch (randomNumber) {
      case 1:
        setDiceImage(DiceOne);
        setMove(1)
        break;
      case 2:
        setDiceImage(DiceTwo);
        setMove(2)
        break;
      case 3:
        setDiceImage(DiceThree);
        setMove(3)
        break;
      case 4:
        setDiceImage(DiceFour);
        setMove(4)
        break;
      case 5:
        setDiceImage(DiceFive);
        setMove(5)
        break;
      case 6:
        setDiceImage(DiceSix);
        setMove(6)
        break;
    }
    props.onMove({
        move: randomNumber
    })
  }

  const handlerMove = (event) => {
    count += 1
    setMove(count)
  }

  let yellowPieceProps = {
    color: COLORS.YELLOW,
    startPos: {
      x: 150,
      y: 450,
      cellNumber: 58,
    },
    id: 0
  }
  let redPieceProps = {
    color: COLORS.RED,
    startPos: {
      x: 200,
      y: 150,
      cellNumber: 31,
    },
    id: 1
  }

  props.addPiece(yellowPieceProps)

  const populatePieces = (config)=> {
    for(let i=0;i<config.colors; i++){
      if(config.colors[i] == COLORS.RED){

      }
    }
  }

  const onClickHandler = () => {
    setMove(move + 1)
  }

  return (
      <View style={styles.container}>
        <GameBoard></GameBoard>
        <Piece props={yellowPieceProps} key={0}></Piece>
        <Piece props={redPieceProps} key={1}></Piece>
        <Dice imageUrl={diceImage} pressHandler={rollDiceOnTap} />
        {/* <Lottie source={require('../assets/canfette.json')} /> */}
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