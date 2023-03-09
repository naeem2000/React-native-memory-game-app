import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {faHourglass} from '@fortawesome/free-solid-svg-icons';
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

interface User {
  userName: string;
}

interface Error {
  emailError: string;
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Login({navigation}: any) {
  const [userData, setUserData] = useState<User>({userName: ''});

  const [loading, setLoading] = useState<boolean>(false);

  const [error, setError] = useState<Error>({
    emailError: '',
  });

  function InputUsername(userName: string) {
    setUserData({...userData, userName});
  }

  let errorTrigger = error;

  const onLogin = async () => {
    if (userData.userName === '') {
      errorTrigger = {
        ...errorTrigger,
        emailError: 'Please Enter a username.',
      };
    } else
      errorTrigger = {
        ...errorTrigger,
        emailError: '',
      };

    if (!error) {
      AsyncStorage.setItem('username', userData.userName);
    }
    setError(errorTrigger);
  };

  const loginLoader = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 5000);
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
            placeholder="username"
            onChangeText={e => InputUsername(e)}
            value={userData.userName}
          />
          {error.emailError && (
            <Text style={{color: 'red'}}>{error.emailError}</Text>
          )}

          {userData.userName ? (
            <>
              {!loading && (
                <TouchableOpacity
                  style={styles.loginButton}
                  onPress={() => {
                    onLogin();
                    navigation.navigate('Home');
                    loginLoader();
                  }}>
                  <Text style={{color: 'white'}}>Log in</Text>
                </TouchableOpacity>
              )}
              {loading && (
                <TouchableOpacity style={styles.loginButton}>
                  <FontAwesomeIcon icon={faHourglass} />
                  <Text style={{color: 'white'}}>Loggin in</Text>
                </TouchableOpacity>
              )}
            </>
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
