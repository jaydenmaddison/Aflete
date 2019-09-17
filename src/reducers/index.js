import { combineReducers } from 'redux';
import general from './general';
import workouts from './workouts';
import { reducer as network } from 'react-native-offline';

export default combineReducers({
  general,
  workouts,
  network
});
