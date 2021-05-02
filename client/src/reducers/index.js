import { combineReducers } from 'redux';

import alerts from './alerts';
import auth from './auth';
import branch from './branch';
import error from './error';
const appReducers = combineReducers({ alerts,auth,branch,error });

export const reducers = (state,action)=>{
    if(action.type==='LOGOUT'){
        return appReducers(undefined,action);
    }
    return appReducers(state,action);
}
