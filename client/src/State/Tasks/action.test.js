import { ADD_TODO, EDIT_TODO } from '../actionType';

import {
  addTask,
  editTask,
} from './actions';

describe('Tasks action', () => {
  it('Should add new tasks', () => {
    const payload = 'Task payload';
    const expectedTaskAction = {
      type: ADD_TODO,
      payload
    };
    expect(addTask(payload)).toEqual(expectedTaskAction);
  });

  it('Should edit task', () => {
    const payload = 'Task payload';
    const expectedTaskAction = {
      type: EDIT_TODO,
      payload
    };
    expect(editTask(payload)).toEqual(expectedTaskAction);
  });
});
