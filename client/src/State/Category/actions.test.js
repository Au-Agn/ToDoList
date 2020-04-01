import {
  ADD_CATEGORY,
  DELETE_CATEGORY,
  RENAME_CATEGORY
} from '../actionType';

import {
  addCategory,
  deleteCategory,
  renameCategory
} from './actions';

describe('Category action', () => {
  it('Should add new category', () => {
    const payload = 'Category payload';
    const expectedCategoryAction = {
      type: ADD_CATEGORY,
      payload
    };
    expect(addCategory(payload)).toEqual(expectedCategoryAction);
  });

  it('Should delete category', () => {
    const payload = 'Category payload';
    const expectedCategoryAction = {
      type: DELETE_CATEGORY,
      payload
    };
    expect(deleteCategory(payload)).toEqual(expectedCategoryAction);
  });

  it('Should rename category', () => {
    const payload = 'Category payload';
    const expectedCategoryAction = {
      type: RENAME_CATEGORY,
      payload
    };
    expect(renameCategory(payload)).toEqual(expectedCategoryAction);
  });
});
