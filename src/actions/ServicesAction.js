import axios from "axios";
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

export const getServices = () => async (dispatch) => {
  try {
    dispatch({ type: SERVICE_REQUEST });

    const { data } = await axios.get("Services/GetAllServices");

    if (data.StatusCode === 200) {
      dispatch({
        type: SERVICE_SUCCESS,
        payload: data.ResultSet,
      });
    } else {
      dispatch({
        type: SERVICE_FAIL,
        payload: data.Message || "Failed to fetch services",
      });
    }
  } catch (error) {
    dispatch({
      type: SERVICE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createService = (serviceData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_SERVICE_REQUEST });

    const formData = new FormData();
    formData.append("S_ServiceName", serviceData.S_ServiceName);
    formData.append("S_Description", serviceData.S_Description);
    formData.append("S_BaseCharge", serviceData.S_BaseCharge);

    const { data } = await axios.post("Services/AddServiceDetails", formData);

    if (data.StatusCode === 200) {
      dispatch({ type: CREATE_SERVICE_SUCCESS, payload: data.ResultSet });
      dispatch(getServices()); // Refresh the list
    } else {
      dispatch({ type: CREATE_SERVICE_FAIL, payload: data.Message });
    }
  } catch (error) {
    dispatch({
      type: CREATE_SERVICE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateService = (serviceData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_SERVICE_REQUEST });

    const formData = new FormData();
    formData.append("S_ServiceID", serviceData.S_ServiceID);
    formData.append("S_ServiceName", serviceData.S_ServiceName);
    formData.append("S_Description", serviceData.S_Description);
    formData.append("S_BaseCharge", serviceData.S_BaseCharge);

    const { data } = await axios.put("Services/PutServiceDetails", formData);

    if (data.StatusCode === 200) {
      dispatch({ type: UPDATE_SERVICE_SUCCESS, payload: data.ResultSet });
      dispatch(getServices()); // Refresh the list
    } else {
      dispatch({ type: UPDATE_SERVICE_FAIL, payload: data.Message });
    }
  } catch (error) {
    dispatch({
      type: UPDATE_SERVICE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteService = (serviceId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_SERVICE_REQUEST });

    const formData = new FormData();
    formData.append("S_ServiceID", serviceId);

    const { data } = await axios.delete("Services/DeleteServiceDetails", {
      data: formData,
    });

    if (data.StatusCode === 200) {
      dispatch({ type: DELETE_SERVICE_SUCCESS });
      dispatch(getServices()); // Refresh the list
    } else {
      dispatch({ type: DELETE_SERVICE_FAIL, payload: data.Message });
    }
  } catch (error) {
    dispatch({
      type: DELETE_SERVICE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};