import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {FIREBASE_AUTH, FIREBASE_DB} from '../../FirebaseConfig';
import {ref, child, set, query, get, QueryConstraint} from 'firebase/database';
import { useFirebase } from '../../providers/firebase';

const TimerScreen = ({navigation}) => {
  const [duration, setDuration] = useState(60); // Initial duration in seconds
  const [timer, setTimer] = useState(duration);
  const [rooms, setRooms] = useState([]);
  const firebaseService = useFirebase()

  const fetchRooms = async () => {
    try {
        console.log('snapshot', snapshot)
        const data = await firebaseService.getWaitingRoomsSync()
        console.log('Fetched data:', data);
    } catch(error) {
        console.log(error)
    }
  } 

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    fetchRooms()

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (timer === 0) {
      // Timer completed, perform necessary actions here
      console.log('Timer completed!');
      navigation.navigate('Game')
    }
  }, [timer]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timer}>{formatTime(timer)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timer: {
    fontSize: 48,
  },
});

export default TimerScreen;
