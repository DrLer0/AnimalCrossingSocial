// import axios from 'axios'

// import {ADD_DESIGN, GET_ERRORS, GET_DESIGNS,DESIGN_LOADING, DELETE_DESIGN,GET_DESIGN,CLEAR_ERRORS} from './types'

// export const addDesign = (designData) => dispatch => {
//     dispatch(clearErrors());
//     axios
//         .post('/api/designs',designData)
//         .then(res => dispatch({
//             type: ADD_DESIGN,
//             payload: res.data
//         }))
//         .catch(err => dispatch({
//             type: GET_ERRORS,
//             payload: err.response.data
//         }))
// }

// //Get Posts
// export const getDesigns = () => dispatch => {
//     dispatch(setDesignLoading());
//     axios
//         .get('/api/designs')
//         .then(res => dispatch({
//             type: GET_DESIGNS,
//             payload: res.data
//         }))
//         .catch(err => dispatch({
//             type: GET_DESIGNS,
//             payload: null
//         }))
// }

// //Get Post
// export const getDesign = (id) => dispatch => {
//     dispatch(setDesignLoading());
//     axios
//         .get(`/api/designs/${id}`)
//         .then(res => dispatch({
//             type: GET_DESIGN,
//             payload: res.data
//         }))
//         .catch(err => dispatch({
//             type: GET_DESIGN,
//             payload: null
//         }))
// }

// //Delete Post

// export const deletePost = (postId) => dispatch => {
//     axios
//         .delete(`/api/designs/${postId}`)
//         .then(res => dispatch({
//             type: DELETE_DESIGN,
//             payload: postId
//         }))
//         .catch(err => dispatch({
//             type: GET_ERRORS,
//             payload: err.response.data
//         }))
// }

// //Add Like 

// export const addLike = (postId) => dispatch => {
//     axios
//         .post(`/api/designs/like/${postId}`)
//         .then(res => dispatch(getDesigns()))
//         .catch(err => dispatch({
//             type: GET_ERRORS,
//             payload: err.response.data
//         }))
// }

// //Add UnLike 

// export const removeLike = (postId) => dispatch => {
//     axios
//         .post(`/api/designs/unlike/${postId}`)
//         .then(res => dispatch(getDesigns()))
//         .catch(err => dispatch({
//             type: GET_ERRORS,
//             payload: err.response.data
//         }))
// }

// //Add Comment
// export const addComment = (postId,commentData) => dispatch => {
//     dispatch(clearErrors());
//     axios
//         .post(`/api/designs/comment/${postId}`,commentData)
//         .then(res => dispatch({
//             type: GET_DESIGN,
//             payload: res.data
//         }))
//         .catch(err => dispatch({
//             type: GET_ERRORS,
//             payload: err.response.data
//         }))
// }

// //Delete Comment
// export const deleteComment = (postId,commentId) => dispatch => {
//     axios
//         .delete(`/api/designs/comment/${postId}/${commentId}`)
//         .then(res => dispatch({
//             type: GET_DESIGN,
//             payload: res.data
//         }))
//         .catch(err => dispatch({
//             type: GET_ERRORS,
//             payload: err.response.data
//         }))
// }

// //Set Loading State
// export const setDesignLoading = () => {
//     return{
//         type: DESIGN_LOADING
//     }
// }

// //Clear Erros
// export const clearErrors = () => {
//     return{
//         type: CLEAR_ERRORS
//     }
// }