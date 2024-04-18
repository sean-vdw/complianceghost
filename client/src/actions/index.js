import axios from 'axios';

// Action types
export const ADD_USER_START = 'ADD_USER_START';
export const ADD_USER_SUCCESS = 'ADD_USER_SUCCESS';
export const ADD_USER_FAIL = 'ADD_USER_FAIL';

export const LOGIN_USER_START = 'LOGIN_USER_START';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAIL = 'LOGIN_USER_FAIL';

// Add User Action
export const addUser = (newUser) => (dispatch) => {
  dispatch({type: ADD_USER_START});
  axios.post('https://fam-recipes-app.herokuapp.com/api/users', newUser)
    .then(res => {
      dispatch({ type: ADD_USER_SUCCESS, payload: {username: res.data.username, password: res.data.password }});
    })
    .catch(err => {
      dispatch({ type: ADD_USER_FAIL, payload: err });
    });
};

// Login User Action
export const loginUser = (credentials) => (dispatch) => {
  dispatch({type: LOGIN_USER_START});
  axios.post('https://fam-recipes-app.herokuapp.com/api/login', credentials)
    .then(res => {
      dispatch({ type: LOGIN_USER_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: LOGIN_USER_FAIL, payload: err });
    });
};