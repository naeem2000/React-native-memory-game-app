import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {
  Text,
  View,
  Modal,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const RegisterScreen = ({visible, onClose}: any) => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleRegister = async () => {
    if (username && email && password) {
      await AsyncStorage.setItem(
        'user',
        JSON.stringify({username, email, password}),
      );
      onClose();
      setError('');
    } else {
      setError('Please fill in all the fields');
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <Text style={styles.closeText}>Close</Text>
      </TouchableOpacity>
      <View style={styles.loginContainer}>
        <Text style={styles.register}>Register</Text>
        <View style={styles.innerContainer}>
          <TextInput
            style={styles.textArea}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
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
          {error && <Text style={{color: 'red'}}>{error}</Text>}
          <TouchableOpacity
            style={styles.registerButton}
            onPress={handleRegister}>
            <Text style={{color: 'white'}}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  loginContainer: {
    position: 'relative',
    height: windowHeight,
    width: windowWidth,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  register: {
    textAlign: 'center',
    fontSize: 30,
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
  innerContainer: {
    width: '80%',
  },
  registerButton: {
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
  closeButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 999,
  },
  closeText: {
    color: 'white',
  },
});
