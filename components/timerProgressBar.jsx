import { Text } from 'react-native'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'


export const TimerProgressBar = ({ totalTime, interval, showTimer }) => {

  return (
    showTimer && (
    <CountdownCircleTimer
      isPlaying
      duration={10}
      colors={['#004777', '#F7B801', '#A30000', '#A30000']}
      colorsTime={[7, 5, 2, 0]}
      size={100}
    >
      {({ remainingTime }) => <Text>{remainingTime}</Text>}
    </CountdownCircleTimer>
  ))
};

// const styles = StyleSheet.create({
//   progressBarContainer: {
//     height: 50,
//     backgroundColor: 'red',
//     borderRadius: 5,
//     // overflow: 'hidden',
//   },
//   progressBar: {
//     height: '100%',
//     backgroundColor: '#007AFF', // Replace with your desired progress bar color
//   },
// });
