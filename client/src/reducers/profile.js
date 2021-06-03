export const ADD_USER = 'ADD_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const FORM_SUBMITION_STATUS = 'FORM_SUBMITION_STATUS';

const initialState = {
  profile: {
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: ''
  },
  formSubmitted: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      return {
        ...state,
        profile: action.payload.user,
        formSubmitted: false // after update user formsubmition reset
      }
    case UPDATE_USER:
      return {
        ...state,
        profile: action.payload.user,
        formSubmitted: false // after update user formsubmition reset
      }
    case FORM_SUBMITION_STATUS:
      return {
        ...state,
        formSubmitted: action.payload.status
      }
    default:
      return state;
  }
}

export default reducer;
