import {ADD_USER, UPDATE_USER, FORM_SUBMITION_STATUS} from '../reducers/profile';

export const ActionCreators = {

    addProfile: (user) => ({ type: ADD_USER, payload: { user } }),
  
  
    updateProfile: (user) => ({ type: UPDATE_USER, payload: { user } }),
  
    formSubmittionStatus: (status) => ({ type: FORM_SUBMITION_STATUS, payload: { status }})
  
  }