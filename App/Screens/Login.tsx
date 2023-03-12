import AsyncStorage from '@react-native-async-storage/async-storage';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHourglass} from '@fortawesome/free-solid-svg-icons';
import RegisterScreen from './Register';
import React, {useState} from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const LoginScreen = ({navigation}: any) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const handleLogin = async () => {
    const userData = await AsyncStorage.getItem('user');
    const user = JSON.parse(userData!);
    console.log(userData);

    if (user.email === email && user.password === password) {
      navigation.navigate('Home');
      setErrorMessage('');
      loginLoader();
    } else {
      setErrorMessage('Invalid email or password');
      setLoading(false);
    }
  };

  const loginLoader = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  };

  return (
    <View style={styles.loginContainer}>
      <Text style={styles.welcome}>Welcome!</Text>
      <Text style={styles.welcomeSub}>Up for a memory challenge?{'\n'}</Text>
      <Text style={styles.loginMainText}>Login</Text>
      <View style={styles.innerContainer}>
        <TextInput
          style={styles.textArea}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.textArea}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        {!errorMessage ? (
          <>
            {!loading && (
              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleLogin}>
                <Text style={{color: 'white'}}>Log in</Text>
              </TouchableOpacity>
            )}
            {loading && (
              <TouchableOpacity style={styles.loginButton}>
                <FontAwesomeIcon icon={faHourglass} />
                <Text style={{color: 'white'}}>Logging in</Text>
              </TouchableOpacity>
            )}
          </>
        ) : (
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={{color: 'white'}}>Log in</Text>
          </TouchableOpacity>
        )}
        {errorMessage && (
          <Text style={{color: 'red', margin: 10}}>{errorMessage}</Text>
        )}
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text style={styles.smallText}>Not registered?</Text>
        </TouchableOpacity>
      </View>
      <RegisterScreen
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
};

export default LoginScreen;

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

    margin: 10,
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
