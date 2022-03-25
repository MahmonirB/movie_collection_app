// libs
import { createStore, combineReducers } from 'redux';
import { authReducer } from './reducers/authReducer';
import { categoryReducer } from './reducers/categoryReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  category: categoryReducer,
});

const configureStore = () => {
  return createStore(rootReducer);
};

export default configureStore;
