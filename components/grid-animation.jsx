import React, { useState, useEffect } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

const GRID_SIZE = 5; // Define the size of the grid
const BOX_SIZE = 50; // Define the size of each box in the grid

const GridAnimation = () => {
  const [animation] = useState(new Animated.ValueXY({ x: 0, y: 0 }));
  const [boxPositions, setBoxPositions] = useState([]);

  // Generate the box positions for the grid
  useEffect(() => {
    const positions = [];
    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        positions.push({
          x: j * BOX_SIZE,
          y: i * BOX_SIZE,
        });
      }
    }
    setBoxPositions(positions);
  }, []);

  return (
    <View style={styles.container}>
      {boxPositions.map((position, index) => (
        <View
          key={index}
          style={[
            styles.box,
            {
              left: position.x,
              top: position.y,
            },
          ]}
        />
      ))}
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
  box: {
    position: 'absolute',
    width: BOX_SIZE,
    height: BOX_SIZE,
    backgroundColor: 'grey',
    borderWidth: 1,
    borderColor: 'black',
  },
  dot: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'blue',
  },
});

export default GridAnimation;