/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

if (process.env.NODE_ENV === 'development') {
  GLOBAL.XMLHttpRequest =
    GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;
  GLOBAL.Blob = GLOBAL.originalBlob || GLOBAL.Blob;
  GLOBAL.FileReader = GLOBAL.originalFileReader || GLOBAL.FileReader;
  import('./reactotron').then(() => console.log('Reactotron Configured'));
}

AppRegistry.registerComponent(appName, () => App);
