import { FETCH_BRANCHES} from '../constants/actionTypes';

export default (branches = [], action) => {
  switch (action.type) {
    case FETCH_BRANCHES:
      return action.payload;
    default:
      return branches;
  }
};