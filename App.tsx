// libs
import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './src/store/store';
import { AppContainer } from './src/AppStack';

const store = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      <StatusBar barStyle="dark-content" />
      <AppContainer />
    </Provider>
  );
};

export default App;
