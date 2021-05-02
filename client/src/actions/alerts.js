import { FETCH_ALL, CREATE, UPDATE} from '../constants/actionTypes';

import * as api from '../api/index.js';

export const getAlerts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchAlerts();
    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
export const getAlertsByPin = (pincodes) => async (dispatch) => {
    try {
      const { data } = await api.getAlertsByPin(pincodes);
      dispatch({ type: FETCH_ALL, payload: data });
    } catch (error) {
      console.log(error.message);
    }
  };
export const createAlert = (alert,socket) => async (dispatch) => {
  try {
    const { data } = await api.createAlert(alert);
    socket.emit("newHunt",data);
    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};


export const updateAlert = (id,branchId) => async (dispatch) => {
  try {
    const { data } = await api.updateAlert(id,branchId);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
