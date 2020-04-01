import fetch from 'node-fetch';
import { loginUser } from './action';
import { urls } from '../../api/apiRoutes';

export const userLoginPost = user => dispatch => {
  return fetch(urls.login, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response;
    })
    .then(response => response.json())
    .then(response => {
      localStorage.setItem('user', response.token);
      dispatch(loginUser(response.user));
    });
};
