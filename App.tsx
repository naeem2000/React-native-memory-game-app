/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MemoryGame from './App/Screens/MemoryGame';
import Register from './App/Screens/Register';
import Login from './App/Screens/Login';
import React from 'react';

const Stack = createStackNavigator();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={MemoryGame} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
