
import { useState, useRef, useEffect } from 'react'
import {COLORS, PieceProps, Pos} from '../stores/types'
import {BLUE_GOTI_PATH, GREEN_GOTI_PATH, RED_GOTI_PATH, YELLOW_GOTI_PATH} from '../stores/constants'
import { Animated, StyleSheet, View } from 'react-native'
import React from 'react'

// function usePrevPropValue(value) {
//     const ref = useRef()
//     useEffect(()=>{
//         ref.current = value;
//     });
//     return ref.current;
// }

const Piece = (props:{props:PieceProps}) => {
    const gotiProps = props.props
    let path: (number)[] =[]
    const [currPos, setCurrPos] = useState(gotiProps.startPos)
    const [animation] = useState(new Animated.ValueXY({ x: currPos.x, y: currPos.y }));
    const [moves, setMoves] = useState([])

    useEffect(()=>{
        populatePath()
        move(gotiProps.move)
    }, [gotiProps.move])

    useEffect(()=>{
        Animated.sequence(moves).start();
        setMoves([])
    }, [currPos])

    const populatePath = () => {
        switch(gotiProps.color) {
            case COLORS.RED:
                path=RED_GOTI_PATH
                break
            case COLORS.BLUE:
                path=BLUE_GOTI_PATH
                break
            case COLORS.GREEN:
                path = GREEN_GOTI_PATH
                break
            case COLORS.YELLOW:
                path = YELLOW_GOTI_PATH
                break
        }
    }

    const move = (diceNumber: number) => {
        let currIndex = path.indexOf(currPos.cellNumber)
        let destIndex = (currIndex + diceNumber) % path.length
        if(gotiProps.cellMap){
            let destCell =  null
            for(let i=currIndex+1; i<=destIndex; i++){
                destCell = gotiProps.cellMap[path[i]]
                const move = Animated.timing(animation, {
                    toValue: { x: destCell.x, y: destCell.y },
                    duration: 700,
                    useNativeDriver: true,
                  })
                moves.push(move)
            }
            setMoves(moves)
            if(destCell) {
            setCurrPos({
                x: destCell.x,
                y: destCell.y,
                cellNumber: destCell.index
            })
        }
        }
    }

    return (
        <View>
        <Animated.View
        style={[
          styles.dot,
          {
            transform: [
              { translateX: animation.x },
              { translateY: animation.y }
            ],
          },
        ]}
      />
      </View>
    )
}

const styles = StyleSheet.create({
    dot: {
      position: 'absolute',
      width: 20,
      height: 20,
      borderRadius: 10,
      backgroundColor: 'yellow',
    },
  });


export default Piece