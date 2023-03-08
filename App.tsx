/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {SafeAreaView, ScrollView, View} from 'react-native';
import Login from './App/Screens/Login';
import React from 'react';

function App(): JSX.Element {
  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View>
          <Login />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
