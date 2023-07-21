import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
// import {ref, set} from 'firebase/database'
// import { FIREBASE_DB } from '../../FirebaseConfig';
import { connect } from 'react-redux';
import { useFirebase } from '../../providers/firebase';
import {io} from "socket.io-client";
const socket = io.connect("https://fedd-122-172-82-83.ngrok-free.app")


const mapStateToProps = state => ({
  ...state.board
});

const mapDispatchToProps = dispatch => ({
  onUserLogin: payload => dispatch({ type: 'SET_USER', payload })
});

const LoginScreen = (props) => {
  const navigation = props.navigation
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const firebaseService = useFirebase()

  const handleLogin = () => {
    // Perform login logic here
    firebaseService.signInWithEmailAndPassword(email, password).then((userCredential) => {
        // Signed in r
        const user = userCredential.user;
        const payload = {
          "userId": user.uid,
        }

        props.onUserLogin(payload)
        firebaseService.addLoggedInUser(user.uid)

        handleSocketConnection()

        navigation.navigate('Game')
      })
      .catch((error) => {
        console.log('error', error)
        navigation.navigate('Signup')
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  const handleSocketConnection = () => {

    socket.emit('joinRoom')
    socket.on('chat', (msg)=>{
        console.log(msg)
    });
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
