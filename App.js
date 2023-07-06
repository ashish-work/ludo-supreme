import React, { useState, useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, Button, Image, Pressable, Text } from 'react-native';
import GameBoard from './components/game-board';
import Piece from './components/piece';
import { COLORS } from './stores/types';
import DiceOne from './assets/One.png'
import DiceTwo from './assets/Two.png'
import DiceThree from './assets/Three.png'
import DiceFour from './assets/Four.png'
import DiceFive from './assets/Five.png'
import DiceSix from './assets/Six.png'
// import type { PropsWithChildren } from 'react';

const GRID_SIZE = 5; // Define the size of the grid
const BOX_SIZE = 25; // Define the size of each box in the grid
let count = 1

// type DiceProps = PropsWithChildren<{}>
const Dice = ({imageUrl, pressHandler}) => {
  return (
    <View style={styles.diceContainer}>
      <Pressable onPress={pressHandler}>
      <Image style={styles.diceImage} source={imageUrl}/>
      </Pressable>
    </View>
  )
}
export default function App() {
  // const [animation] = useState(new Animated.ValueXY({ x: 75, y: 250 }));
  const [cellMap, setCellMap] = useState()
  const [move, setMove] = useState(0)
  const gotiRef = useRef(null)
  const [diceImage, setDiceImage] = useState()

  let count = 0
  const cellMapHandlerFn = (cellMap) => {
    setCellMap(cellMap)
  }

  const rollDiceOnTap = () => {
    let randomNumber = Math.floor(Math.random() * 6) + 1;

    switch(randomNumber) {
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
  }

  const handlerMove = (event) => {
    count += 1
    console.log('count', count)
    setMove(count)
  }

  // useEffect(() => {
  //   console.log("Hello World!")
  //   const move1 = Animated.timing(animation, {
  //     toValue: { x: 75, y: 275 },
  //     duration: 2000,
  //     useNativeDriver: true,
  //   });

  //   const move2 = Animated.timing(animation, {
  //     toValue: { x: 150, y: 350 },
  //     duration: 2000,
  //     useNativeDriver: true,
  //   });

  //   const move3 = Animated.timing(animation, {
  //     toValue: { x: 225, y: 275 },
  //     duration: 2000,
  //     useNativeDriver: true,
  //   });

  //   Animated.loop(
  //     Animated.sequence([move1, move2, move3])
  //   ).start();
  // }, []);

  const gameBoardProps = {cellMapHandler: cellMapHandlerFn}
  let gotiProps = {
    color: COLORS.YELLOW,
    startPos: {
      x: 150,
      y: 350,
      cellNumber: 54,
    },
    path: [],
    cellMap: cellMap,
    move: move
  }

  const onClickHandler = () => {
    // console.log('clicked: ')
    // count += 1
    // console.log('count', count)
    setMove(move + 1)
  }

    return (
    <View style={styles.container}>
      <GameBoard props={gameBoardProps}></GameBoard>
      <Piece ref={gotiRef} props={gotiProps}></Piece>
      {/* <Animated.View
        style={[
          styles.dot,
          {
            transform: [
              { translateX: animation.x },
              { translateY: animation.y },
              { scaleX: scale},
              { scaleY: scale},
            ],
          },
        ]}
      /> */}
      {/* <Pressable title='Click me' onPress={rollDiceOnTap}>
        <Text>
          Click Me
        </Text>
      </Pressable> */}
      <Dice imageUrl={diceImage} pressHandler={rollDiceOnTap}/>
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
    margin: 12,
    marginBottom:50,
    justifyContent:'flex-end',
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
