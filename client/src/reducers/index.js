import { ADD_USER_START, ADD_USER_SUCCESS, ADD_USER_FAIL } from '../actions';

export const initialState = {
  username: '',
  password: '',
  isLoading: false,
  error: ''
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_USER_START:
      return {
        ...state,
        isLoading: true
      }
    case ADD_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        username: action.payload,
        password: action.payload,
        error: ''
      }
    case ADD_USER_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    default:
      return state
  };
};

export default reducer;