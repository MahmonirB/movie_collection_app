// libs
import React from 'react';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import configureStore from './src/store/store';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
// components
import HomePage from './src/screens/HomePage';

const store = configureStore();
const stackNavigator = createStackNavigator(
  {
    Home: {screen: HomePage},
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      header: null,
    },
  },
);
const AppContainer = createAppContainer(stackNavigator);
const App = () => {
  return (
    <Provider store={store}>
      <StatusBar barStyle="dark-content" />
      <AppContainer />
    </Provider>
  );
};

export default App;
