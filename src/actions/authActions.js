import authService from '../services/authService';

export const AUTH_ACTIONS = {
  LOGIN_START: 'LOGIN_START',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  SIGNUP_START: 'SIGNUP_START',
  SIGNUP_SUCCESS: 'SIGNUP_SUCCESS',
  SIGNUP_FAILURE: 'SIGNUP_FAILURE',
  LOGOUT: 'LOGOUT',
  SET_USER: 'SET_USER'
};

export const loginStart = () => ({
  type: AUTH_ACTIONS.LOGIN_START
});

export const loginSuccess = (user) => ({
  type: AUTH_ACTIONS.LOGIN_SUCCESS,
  payload: user
});

export const loginFailure = (error) => ({
  type: AUTH_ACTIONS.LOGIN_FAILURE,
  payload: error
});

export const signupStart = () => ({
  type: AUTH_ACTIONS.SIGNUP_START
});

export const signupSuccess = (user) => ({
  type: AUTH_ACTIONS.SIGNUP_SUCCESS,
  payload: user
});

export const signupFailure = (error) => ({
  type: AUTH_ACTIONS.SIGNUP_FAILURE,
  payload: error
});

export const logout = () => ({
  type: AUTH_ACTIONS.LOGOUT
});

export const setUser = (user) => ({
  type: AUTH_ACTIONS.SET_USER,
  payload: user
});

// Async action creators
export const loginUser = (credentials) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const user = authService.login(credentials);
    dispatch(loginSuccess(user));
    return user;
  } catch (error) {
    dispatch(loginFailure(error.message));
    throw error;
  }
};

export const signupUser = (userData) => async (dispatch) => {
  dispatch(signupStart());
  try {
    const user = authService.signup(userData);
    dispatch(signupSuccess(user));
    return user;
  } catch (error) {
    dispatch(signupFailure(error.message));
    throw error;
  }
};

export const logoutUser = () => (dispatch) => {
  authService.logout();
  dispatch(logout());
};