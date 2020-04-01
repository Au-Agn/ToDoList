export const RENAME_CATEGORY = 'RENAME_CATEGORY';
export const DELETE_CATEGORY = 'DELETE_CATEGORY';
export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';
export const PUT_CATEGORY = 'PUT_CATEGORY';

export const fetchCategoriesSuccess = payload => ({
  type: FETCH_CATEGORIES,
  payload
});

export const putNewCategorySuccess = payload => ({
  type: PUT_CATEGORY,
  payload
});

export const deleteCategorySuccess = payload => ({
  type: DELETE_CATEGORY,
  payload
});

export const renameCategory = payload => ({
  type: RENAME_CATEGORY,
  payload
});
