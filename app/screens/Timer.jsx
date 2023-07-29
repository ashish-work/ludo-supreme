import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import {TimerProgressBar} from '../../components/timerProgressBar';

const ProgressTimerScreen = () => {
  const totalTime = 5000; // Total time in milliseconds (e.g., 5 seconds)
  const interval = 50; // Interval at which the progress bar updates (optional)

  return (
    <View style={styles.container}>
      <Text>Timer Screen</Text>
      <TimerProgressBar totalTime={totalTime} interval={interval} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProgressTimerScreen;
