import deepFreeze from 'deep-freeze';
import {
  taskReducer
} from './reducer';
import {
  ADD_TODO,
  EDIT_TODO
} from '../actionType';

const state = [{
  content: 'test1',
  id: '1',
  checked: false,
  categoryId: '1',
  description: 'test1'
},
{
  content: 'test2',
  id: '2',
  checked: true,
  categoryId: '1',
  description: 'test2'
}
];

deepFreeze(state);

describe('Task reduser', () => {
  it('add new task', () => {
    // arrange
    const newTask = {
      content: 'test3',
      checked: false,
      categoryId: '3',
      description: 'test3',
      id: '7'
    };
    const action = {
      type: ADD_TODO,
      payload: newTask
    };
    const stateToCompare = [{
      content: 'test3',
      checked: false,
      categoryId: '3',
      description: 'test3',
      id: '7'
    },
    {
      content: 'test1',
      id: '1',
      checked: false,
      categoryId: '1',
      description: 'test1'
    },
    {
      content: 'test2',
      id: '2',
      checked: true,
      categoryId: '1',
      description: 'test2'
    }
    ];
    // action
    const result = taskReducer(state, action);
    // compare
    expect(result).toEqual(stateToCompare);
  });
  it('edit todo', () => {
    // arrange
    const changedTask = {
      content: 'test1_1',
      id: '2',
      checked: false,
      categoryId: '1',
      description: 'test1_1'
    };
    const action = {
      type: EDIT_TODO,
      payload: changedTask
    };
    const stateToCompare = [{
      content: 'test1',
      id: '1',
      checked: false,
      categoryId: '1',
      description: 'test1'
    },
    {
      content: 'test1_1',
      id: '2',
      checked: false,
      categoryId: '1',
      description: 'test1_1'
    }
    ];
    // action
    const result = taskReducer(state, action);
    // compare
    expect(result).toEqual(stateToCompare);
  });
});
