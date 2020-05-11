import axios from "axios";
import {
  GET_PROFILE,
  GET_ALL_PROFILES,
  PROFILE_LOADING,
  PROFILES_LOADING,
  CLEAR_CURRENT_PROFILE,
  SET_CURRENT_USER,
  GET_ERRORS
} from "./types";

//Get Current Profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile")
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};

//Get Profile By ID
export const getProfileById = (userId) => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`/api/profile/user/${userId}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: { msg: err.response.statusText, status: err.response.status }
       })
    );
};

//Get Profile By Handle
export const getProfileByHandle = (handle) => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`/api/profile/handle/${handle}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: null
       })
    );
};



//Get All Profiles
export const getAllProfiles = () => async dispatch => {
  dispatch(setProfilesLoading());
  // dispatch({ type: CLEAR_CURRENT_PROFILE });
  axios
    .get("/api/profile/all")
    .then(res =>
      dispatch({
        type: GET_ALL_PROFILES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ALL_PROFILES,
        payload: {}
      })
    );
}

//Create Profile
export const createProfile = (profileData, history, userId) => dispatch => {
  axios
    .post("/api/profile",profileData)
    .then(res => history.push(`/profile/${userId}`))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Add Experience

export const addExperience = (expData,history) => dispatch => {
  axios
      .post('/api/profile/experience',expData)
      .then(res => history.push('dashboard'))
      .catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      }))
}

//Add Experience

export const addEducation = (eduData,history) => dispatch => {
  axios
      .post('/api/profile/education',eduData)
      .then(res => history.push('dashboard'))
      .catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      }))
}

//Delete Experience

export const deleteExperience = (expId) => dispatch => {
  if(window.confirm('Are you sure you want to delete this experience ?'))
  axios
      .delete('/api/profile/experience/'+expId)
      .then(res => dispatch({
        type: GET_PROFILE,
        payload: res.data
      }))
      .catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      }))
}

//Delete Education

export const deleteEducation = (eduId) => dispatch => {
  if(window.confirm('Are you sure you want to delete this education ?'))
  axios
      .delete('/api/profile/education/'+eduId)
      .then(res => dispatch({
        type: GET_PROFILE,
        payload: res.data
      }))
      .catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      }))
}

//Delete Account
export const deleteAccount = () => dispatch => {
  if(window.confirm('Are you sure you want to delete the account ?'))
    axios.delete('/api/profile')
         .then(res => dispatch({
           type: SET_CURRENT_USER,
           payload:{}
         }))
         .catch(err => dispatch({
           type: GET_ERRORS,
           payload: err.response.data
         })) 

}

// Set profile Loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

// Set profiles Loading
export const setProfilesLoading = () => {
  return {
    type: PROFILES_LOADING
  };
};

// Clear Profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};
