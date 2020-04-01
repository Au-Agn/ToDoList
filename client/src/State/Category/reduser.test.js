import deepFreeze from 'deep-freeze';
import { categoryReducer } from './reducer';
import { ADD_CATEGORY, DELETE_CATEGORY, RENAME_CATEGORY } from '../actionType';
const state = [
  {
    content: 'test1',
    id: '1'
  },
  {
    content: 'test2',
    id: '5',
    parentId: '1'
  }
];

deepFreeze(state);

describe('Category reduser', () => {
  it('add new category', () => {
    // arrange
    const newCategory = {
      content: 'test3',
      id: '6'
    };
    const action = {
      type: ADD_CATEGORY,
      payload: newCategory
    };
    const stateToCompare = [
      {
        content: 'test3',
        id: '6'
      },
      {
        content: 'test1',
        id: '1'
      },
      {
        content: 'test2',
        id: '5',
        parentId: '1'
      }
    ];
    // action
    const result = categoryReducer(state, action);
    // compare
    expect(result).toEqual(stateToCompare);
  });
  it('delete category', () => {
    // arrange
    const deletCategiry = '5';
    const action = {
      type: DELETE_CATEGORY,
      payload: deletCategiry
    };
    const stateToCompare = [
      {
        content: 'test1',
        id: '1'
      }
    ];
    // action
    const result = categoryReducer(state, action);
    // compare
    expect(result).toEqual(stateToCompare);
  });
  it('edit category', () => {
    // arrange
    const changedCategory = {
      content: 'test1_1',
      id: '1'
    };
    const action = {
      type: RENAME_CATEGORY,
      payload: changedCategory
    };
    const stateToCompare = [
      {
        content: 'test1_1',
        id: '1'
      },
      {
        content: 'test2',
        id: '5',
        parentId: '1'
      }
    ];
    // action
    const result = categoryReducer(state, action);
    // compare
    expect(result).toEqual(stateToCompare);
  });
});
