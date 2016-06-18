import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR } from './types';
const ROOT_URL = 'http://localhost:8888';

export function signinUser({ email, password }) {
  return function(dispatch) {
    // Submit email/password to server
    const request = axios.post(`${ROOT_URL}/signin`, {
      email,
      password,
    });

    request.then(response => {
      // If verified,
      // 1. update state to authenticated
      dispatch({
        type: AUTH_USER,
      });
      // 2. save jwt token
      localStorage.setItem('token', response.data.token);
      // 3. redirect to /feature
      browserHistory.push('/feature');
    }).catch(() => {
      // Else,
      // 1. Show error
      dispatch(authError('Wrong email/password.'));
    });
  };
}

export function signoutUser() {
  localStorage.removeItem('token');

  return {
    type: UNAUTH_USER,
  };
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error,
  };
}
