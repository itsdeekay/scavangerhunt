import { FETCH_ALL, CREATE, UPDATE} from '../constants/actionTypes';

export default (alerts = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case CREATE:
      return [...alerts, action.payload];
    case UPDATE:
      return alerts.map((alert) => (alert._id === action.payload._id ? action.payload : alert));
    default:
      return alerts;
  }
};