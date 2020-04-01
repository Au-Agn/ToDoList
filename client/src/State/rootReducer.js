import { combineReducers } from 'redux';
import { categories } from './Category/reducer';
import { tasks } from './Tasks/reducer';

export default combineReducers({
  categories,
  tasks
});
