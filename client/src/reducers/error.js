import { ERROR} from '../constants/actionTypes';

export default (error = {}, action) => {
  switch (action.type) {
    case ERROR:
      return action.payload;
    default:
      return error;
  }
};