import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
// import {ref, set} from 'firebase/database'
// import { FIREBASE_DB } from '../../FirebaseConfig';
import {FIREBASE_AUTH} from '../../FirebaseConfig';
import {signInWithEmailAndPassword} from 'firebase/auth';


const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Perform login logic here
    signInWithEmailAndPassword(FIREBASE_AUTH, email, password).then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        navigation.navigate('Room')
      })
      .catch((error) => {
        navigation.navigate('Signup')
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

export default LoginScreen;
