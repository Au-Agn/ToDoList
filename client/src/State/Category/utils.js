import fetch from 'node-fetch';
import { fetchCategoriesSuccess, putNewCategorySuccess, deleteCategorySuccess, renameCategory } from './actions';
import { urls } from '../../api/apiRoutes';

const token = localStorage.getItem('user');

export const fetchCategories = token => dispatch => {
  return fetch(urls.categories, {
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
    .then(item => dispatch(fetchCategoriesSuccess(item)));
};

export const putNewCategory = category => dispatch => {
  return fetch(urls.categories, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(category)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response;
    })
    .then(response => response.json())
    .then(response => {
      dispatch(putNewCategorySuccess(response.createdCategory));
    });
};

export const fetchRenameCategory = category => dispatch => {
  return fetch(`${urls.categories}/${category.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(category)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response;
    })
    .then(() => {
      dispatch(renameCategory(category));
    });
};

export const deleteCategory = category => dispatch => {
  return fetch(`${urls.categories}/${category.id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(category)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response;
    })
    .then(() => {
      dispatch(deleteCategorySuccess(category));
    });
};
