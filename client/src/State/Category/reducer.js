import { initialState } from '../initialState';
import { FETCH_CATEGORIES, PUT_CATEGORY, RENAME_CATEGORY, DELETE_CATEGORY } from './actions';

export const categories = (state = initialState.categories, action) => {
  switch (action.type) {
    case FETCH_CATEGORIES:
      return Array.from(action.payload);

    case PUT_CATEGORY: {
      const content = action.payload;
      const categories = [content, ...state];
      return categories;
    }
    case DELETE_CATEGORY: {
      const deletedCategory = state.filter(category => category.id !== action.payload.id);
      return deletedCategory;
    }
    case RENAME_CATEGORY: {
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
