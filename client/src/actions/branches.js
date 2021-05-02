import { AUTH,FETCH_BRANCHES,ERROR } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const signin = (formData,router) => async (dispatch) => {
  try {
    const {data} = await api.signIn(formData);
    //console.log(data)
    if(!data.error){
      console.log(data)
      dispatch({ type: AUTH,  payload: data });
      router.push('/');
    }else{
      console.log('else',data)
      dispatch({ type: ERROR,  payload: data });
    }
    //if(data.stat)
    
  } catch (error) {
    console.log('Error')
    console.log(error);
  }
};

export const getBranches = (formData) => async (dispatch) => {
  try {
    const { data } = await api.getBranches(formData);
    dispatch({ type: FETCH_BRANCHES,  payload: data });
  } catch (error) {
    console.log(error);
  }
};