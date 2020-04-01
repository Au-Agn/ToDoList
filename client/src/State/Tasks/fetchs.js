import fetch from 'node-fetch';
import { fetchTasksSuccess, editTaskSuccess, addTask } from './actions';
import { urls } from '../../api/apiRoutes';

const token = localStorage.getItem('user');

export const fetchTasks = token => dispatch => {
  return fetch(urls.tasks, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response;
    })
    .then(response => response.json())
    .then(item => dispatch(fetchTasksSuccess(item)));
};

export const addNewTask = task => dispatch => {
  return fetch(urls.tasks, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(task)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      console.log(response);
      return response;
    })
    .then(response => response.json())
    .then(response => {
      dispatch(addTask(response.createdTask));
    });
};

export const editTask = task => dispatch => {
  return fetch(`${urls.tasks}/${task.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(task)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response;
    })
    .then(() => {
      dispatch(editTaskSuccess(task));
    });
};
