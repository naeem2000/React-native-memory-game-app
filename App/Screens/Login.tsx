import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    AsyncStorage.setItem('email', email);
    AsyncStorage.setItem('password', password);
  }, [email, password]);

  const onLogIn = async () => {
    if (!email) {
      setError(true);
    }
    if (!password) {
      setError(true);
    }
    if (password && email) {
      setError(false);
    }
  };
  return (
    <ScrollView>
      <View style={styles.loginContainer}>
        <Text style={styles.welcome}>Welcome!</Text>
        <Text style={styles.welcomeSub}>Up for a memory challenge?{'\n'}</Text>
        <Text style={styles.loginMainText}>Login</Text>
        <View style={styles.innerContainer}>
          <TextInput
            style={styles.textArea}
            placeholder="Email"
            onChangeText={text => setEmail(text)}
            value={email}
          />
          {error && <Text style={{color: 'maroon'}}>Please enter email</Text>}
          <TextInput
            style={styles.textArea}
            placeholder="Password"
            onChangeText={text => setPassword(text)}
            value={password}
          />
          {error && (
            <Text style={{color: 'maroon'}}>Please enter password</Text>
          )}
          <TouchableOpacity style={styles.loginButton} onPress={e => onLogIn()}>
            <Text style={{color: 'white'}}>Login</Text>
          </TouchableOpacity>
          <Text style={styles.smallText}>Not registered?</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loginContainer: {
    height: windowHeight,
    width: windowWidth,
    backgroundColor: 'coral',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  loginMainText: {
    textAlign: 'center',
    fontSize: 30,
  },
  welcome: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '900',
  },
  welcomeSub: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '900',
  },
  textArea: {
    height: 40,
    backgroundColor: 'white',
    borderWidth: 1,
    marginBottom: 10,
    marginTop: 10,
    padding: 10,
  },
  smallText: {
    fontSize: 15,
    marginTop: 10,
  },
  innerContainer: {
    width: '80%',
  },
  loginButton: {
    borderWidth: 1,
    padding: 10,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 15,
    width: '50%',
    backgroundColor: 'silver',
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
