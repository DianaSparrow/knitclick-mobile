import React from 'react';
import {
  SafeAreaView,
  StatusBar,
} from 'react-native';

import CounterScreen from './src/screens/CounterScreen';

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#f8f4f6"
      />
      <CounterScreen />
    </SafeAreaView>
  );
};

export default App;