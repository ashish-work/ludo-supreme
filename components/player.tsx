import React, { useEffect, useState } from "react";
import { Animated, StyleSheet } from 'react-native';

interface IPlayer {
    source_x: Number,
    source_y: Number,
    color: string
}

export default function Player(playerProps: IPlayer) {
    const [x, setX] = useState(playerProps.source_x)
    const [y, setY] = useState(playerProps.source_y)
    const [animation] = useState(new Animated.ValueXY({ x: x, y: y}));

    useEffect(() => {
        Animated.timing(animation, {
            toValue: {x: x, y: y},
            duration: 2000,
            useNativeDriver: true,
          }).start();
      }, [x, y]);
    

    const move = (x: Number, y: Number)=>{
        this.setX(x)
        this.setY(y)
    }

    return (
    <Animated.View
        style={[
          styles.dot,
          {
            transform: [
              { translateX: animation.x },
              { translateY: animation.y },
            ],
          },
        ]}
      />
    )
}

const styles = StyleSheet.create({
    dot: {
      position: 'absolute',
      width: 20,
      height: 20,
      borderRadius: 10,
      backgroundColor: 'blue',
    },
  });