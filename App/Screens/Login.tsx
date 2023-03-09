import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {faHourglass} from '@fortawesome/free-solid-svg-icons';

interface User {
  email: string;
  password: string;
}

interface Error {
  emailError: string;
  passwordError: string;
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Login() {
  const [userData, setUserData] = useState<User>({email: '', password: ''});

  const [loading, setLoading] = useState<boolean>(false);

  const [error, setError] = useState<Error>({
    emailError: '',
    passwordError: '',
  });

  function Inputemail(email: string) {
    setUserData({...userData, email});
  }

  function InputPassword(password: string) {
    setUserData({...userData, password});
  }

  let errorTrigger = error;

  const onLogin = async () => {
    if (userData.email === '') {
      errorTrigger = {
        ...errorTrigger,
        emailError: 'Please Enter a email.',
      };
    } else
      errorTrigger = {
        ...errorTrigger,
        emailError: '',
      };
    if (userData.password === '') {
      errorTrigger = {
        ...errorTrigger,
        passwordError: 'Please enter a password.',
      };
    } else
      errorTrigger = {
        ...errorTrigger,
        passwordError: '',
      };
    loginLoader();
    if (!error) {
      AsyncStorage.setItem('email', userData.email);
      AsyncStorage.setItem('password', userData.password);
    }
    setError(errorTrigger);
    navigation.navigate('Home');
  };

  const loginLoader = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  };

  console.log(AsyncStorage.getItem('email'), AsyncStorage.getItem('password'));

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
            keyboardType="email-address"
            onChangeText={e => Inputemail(e)}
            value={userData.email}
          />
          {error.emailError && (
            <Text style={{color: 'red'}}>{error.emailError}</Text>
          )}
          <TextInput
            style={styles.textArea}
            placeholder="Password"
            onChangeText={e => InputPassword(e)}
            value={userData.password}
          />
          {error.passwordError && (
            <Text style={{color: 'red'}}>{error.passwordError}</Text>
          )}
          {userData.email && userData.password ? (
            <TouchableOpacity
              style={styles.loginButton}
              onPress={e => onLogin()}>
              <Text style={{color: 'white'}}>
                {!loading && <Text>Log in</Text>}
                {loading && (
                  <>
                    <FontAwesomeIcon icon={faHourglass} />
                    &nbsp;
                    <Text>Loggin in</Text>
                  </>
                )}
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.loginButton}
              onPress={e => onLogin()}>
              <Text style={{color: 'white'}}>Log in</Text>
            </TouchableOpacity>
          )}
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
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  loginMainText: {
    textAlign: 'center',
    fontSize: 30,
    color: 'white',
  },
  welcome: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '900',
    color: 'white',
  },
  welcomeSub: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '900',
    color: 'white',
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
    color: 'white',

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
