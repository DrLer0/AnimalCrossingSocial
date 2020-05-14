import axios from 'axios';

import {ADD_POST, GET_POSTS, GET_ERRORS,POST_LOADING,CLEAR_ERRORS} from './types'
// import {ADD_POST, GET_ERRORS, GET_POSTS,POST_LOADING, DELETE_POST,GET_POST,CLEAR_ERRORS} from './types'

export const addPost = (postData) => dispatch => {
    dispatch(clearErrors());
    axios
        .post('/api/posts/',postData)
        .then(res => dispatch({
            type: ADD_POST,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
}

// A function to send a POST request with a new image
export const addImage = (form, extraParams) => {
    // // the URL for the request
    const url = "/api/posts/images";

    // // The data we are going to send in our request
    const imageData = new FormData(form);

    imageData.append('user', extraParams.user);
    imageData.append('name', extraParams.name);
    
    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: "post",
        body: imageData
    });
    
    console.log("HERE--------------------------------------")
    console.log(form)
    // Send the request with fetch()
    fetch(request)
        .then(function (res) {
            // Handle response we get from the API.
            // Usually check the error codes to see what happened.
            if (res.status === 200) {
                // If image was added successfully, tell the user.
                // dashboardComp.setState({
                //     message: {
                //         body: "Success: Added an image.",
                //         type: "success"
                //     }
                // });
            } else {
                // If server couldn't add the image, tell the user.
                // Here we are adding a generic message, but you could be more specific in your app.
                // dashboardComp.setState({
                //     message: {
                //         body: "Error: Could not add image.",
                //         type: "error"
                //     }
                // });
            }
        })
        .catch(error => {
            console.log(error);
        });
};

//Get Posts
export const getPosts = () => dispatch => {
    dispatch(setPostLoading());
    axios
        .get('/api/posts')
        .then(res => dispatch({
            type: GET_POSTS,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: GET_POSTS,
            payload: null
        }))
}

//Get Post
// export const getPost = (id) => dispatch => {
//     dispatch(setPostLoading());
//     axios
//         .get(`/api/post/${id}`)
//         .then(res => dispatch({
//             type: GET_POST,
//             payload: res.data
//         }))
//         .catch(err => dispatch({
//             type: GET_POST,
//             payload: null
//         }))
// }

//Delete Post

// export const deletePost = (postId) => dispatch => {
//     axios
//         .delete(`/api/post/${postId}`)
//         .then(res => dispatch({
//             type: DELETE_POST,
//             payload: postId
//         }))
//         .catch(err => dispatch({
//             type: GET_ERRORS,
//             payload: err.response.data
//         }))
// }

//Add Like 

// export const addLike = (postId) => dispatch => {
//     axios
//         .post(`/api/posts/like/${postId}`)
//         .then(res => dispatch(getPosts()))
//         .catch(err => dispatch({
//             type: GET_ERRORS,
//             payload: err.response.data
//         }))
// }

//Add UnLike 

// export const removeLike = (postId) => dispatch => {
//     axios
//         .post(`/api/posts/unlike/${postId}`)
//         .then(res => dispatch(getPosts()))
//         .catch(err => dispatch({
//             type: GET_ERRORS,
//             payload: err.response.data
//         }))
// }

//Add Comment
// export const addComment = (postId,commentData) => dispatch => {
//     dispatch(clearErrors());
//     axios
//         .post(`/api/post/comment/${postId}`,commentData)
//         .then(res => dispatch({
//             type: GET_POST,
//             payload: res.data
//         }))
//         .catch(err => dispatch({
//             type: GET_ERRORS,
//             payload: err.response.data
//         }))
// }

//Delete Comment
// export const deleteComment = (postId,commentId) => dispatch => {
//     axios
//         .delete(`/api/post/comment/${postId}/${commentId}`)
//         .then(res => dispatch({
//             type: GET_POST,
//             payload: res.data
//         }))
//         .catch(err => dispatch({
//             type: GET_ERRORS,
//             payload: err.response.data
//         }))
// }

//Set Loading State
export const setPostLoading = () => {
    return{
        type: POST_LOADING
    }
}

//Clear Erros
export const clearErrors = () => {
    return{
        type: CLEAR_ERRORS
    }
}