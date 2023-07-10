import { View, Text } from 'react-native'
import React, { useEffect } from 'react'

import {ref, set} from 'firebase/database'
import { FIREBASE_DB } from '../../FirebaseConfig';

const Login = () => {

    useEffect(()=>{
        set(ref(FIREBASE_DB, 'todos'), {
            tilte: 'Wow',
            done: false
        })
    },[])

  return (
    <View>
      <Text>Login</Text>
    </View>
  )
}

export default Login