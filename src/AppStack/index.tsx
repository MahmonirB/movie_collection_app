import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
// components
import AuthPage from 'screens/Auth/AuthPage';
import MainSignPage from 'screens/Auth/MainSignPage';
import EnterUserName from 'screens/SignIn/EnterUserName';
import ValidateUser from 'screens/SignIn/ValidateUser';
import HomePage from 'screens/MainPanel/HomePage';
import CategoryList from 'screens/MainPanel/Category/CategoryList';
import CategoryMovie from 'screens/MainPanel/Category/CategoryMovie';

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
export const AppContainer = createAppContainer(stackNavigator);
