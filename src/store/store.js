// libs
import {createStore, combineReducers} from 'redux';
import {authReducer} from '../store/reducer/reducers';

const rootReducer = combineReducers({
  auth: authReducer,
});

const configureStore = () => {
  return createStore(rootReducer);
};

export default configureStore;
