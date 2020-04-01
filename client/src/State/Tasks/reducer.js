import { initialState } from '../initialState';
import { FETCH_TASKS, ADD_TODO, EDIT_TODO } from './actions';

// const tmp = {
//   content: '',
//   checked: false,
//   description: ''
// };

export const tasks = (state = initialState.tasks, action) => {
  switch (action.type) {
    case FETCH_TASKS:
      return Array.from(action.payload);
    case ADD_TODO: {
      const newTask = action.payload;
      const tasks = [...state, newTask];
      return tasks;
    }
    case EDIT_TODO: {
      const newState = state.map(item => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            ...action.payload
          };
        }
        return item;
      });
      return [...newState];
    }
    default:
      return state;
  }
};
