import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import {createUserWithEmailAndPassword} from 'firebase/auth'
import { FIREBASE_AUTH } from '../../FirebaseConfig';

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = ({ navigation }) => {
    // Perform signup logic here
    console.log('Email:', email);
    console.log('Password:', password);
    createUserWithEmailAndPassword(FIREBASE_AUTH, email, password).then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        navigation.navigate('Login')
      })
      .catch((error) => {
        console.log('error', error);
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

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
      <Button title="Signup" onPress={handleSignup} />
      <Button title="Login" onPress={() => navigation.navigate('Login')} />
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
  

  export default SignupScreen