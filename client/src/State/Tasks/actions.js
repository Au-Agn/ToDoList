export const ADD_TODO = 'ADD_TODO';
export const EDIT_TODO = 'EDIT_TODO';
export const FETCH_TASKS = 'FETCH_TASKS';

export const fetchTasksSuccess = payload => ({
  type: FETCH_TASKS,
  payload
});

export const addTask = payload => ({
  type: ADD_TODO,
  payload
});
export const editTaskSuccess = payload => ({
  type: EDIT_TODO,
  payload
});
