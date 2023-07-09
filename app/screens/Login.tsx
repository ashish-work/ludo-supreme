import {View, Text, StyleSheet} from "react-native";
import React, { useState } from 'react';
import { FIREBASE_AUTH } from "../../FirebaseConfig";

const Login =  () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState();
    const auth = FIREBASE_AUTH;

    return (
        <View style={}>
            <Text>Login</Text>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      backgroundColor: 'white',
    },
  });