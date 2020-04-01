import { FETCH_USER } from './action';

const initialState = {
  currentUser: {}
}

export const currentUser = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER:
      return { ... action.payload }
    default:
      return state;
  }
}
