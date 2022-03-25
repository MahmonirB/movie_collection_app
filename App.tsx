// libs
import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './src/store/store';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
// components
import AuthPage from './src/screens/Auth/AuthPage';
import MainSignPage from './src/screens/Auth/MainSignPage';
import EnterUserName from './src/screens/SignIn/EnterUserName';
import ValidateUser from './src/screens/SignIn/ValidateUser';
import HomePage from './src/screens/MainPanel/HomePage';
import CategoryList from './src/screens/MainPanel/Category/CategoryList';
import CategoryMovie from './src/screens/MainPanel/Category/CategoryMovie';

const store = configureStore();
const stackNavigator = createStackNavigator(
  {
    AuthPage: { screen: AuthPage },
    MainSignPage: { screen: MainSignPage },
    EnterUserName: { screen: EnterUserName },
    ValidateUser: { screen: ValidateUser },
    HomePage: { screen: HomePage },
    CategoryList: { screen: CategoryList },
    CategoryMovie: { screen: CategoryMovie },
  },
  {
    initialRouteName: 'AuthPage',
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
