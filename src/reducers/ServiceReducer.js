import {
  SERVICE_REQUEST,
  SERVICE_SUCCESS,
  SERVICE_FAIL,
  CREATE_SERVICE_REQUEST,
  CREATE_SERVICE_SUCCESS,
  CREATE_SERVICE_FAIL,
  UPDATE_SERVICE_REQUEST,
  UPDATE_SERVICE_SUCCESS,
  UPDATE_SERVICE_FAIL,
  DELETE_SERVICE_REQUEST,
  DELETE_SERVICE_SUCCESS,
  DELETE_SERVICE_FAIL,
} from "../constants/ServiceConstants";

const initialState = {
  services: [],
  loading: false,
  error: null,
  success: false,
};

export const serviceReducer = (state = initialState, action) => {
  switch (action.type) {
    case SERVICE_REQUEST:
    case CREATE_SERVICE_REQUEST:
    case UPDATE_SERVICE_REQUEST:
    case DELETE_SERVICE_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
        error: null,
      };

    case SERVICE_SUCCESS:
      return {
        ...state,
        loading: false,
        services: action.payload,
        error: null,
      };

    case CREATE_SERVICE_SUCCESS:
    case UPDATE_SERVICE_SUCCESS:
    case DELETE_SERVICE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: null,
      };

    case SERVICE_FAIL:
    case CREATE_SERVICE_FAIL:
    case UPDATE_SERVICE_FAIL:
    case DELETE_SERVICE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };

    default:
      return state;
  }
};