// import {ADD_DESIGN,DESIGN_LOADING,GET_DESIGNS,DELETE_DESIGN,GET_DESIGN} from '../actions/types'
// const initialState = {
//     posts: [],
//     post: {},
//     loading: false
// }

// export default function(state = initialState,action){
//     switch(action.type){
        
//         case ADD_DESIGN:
//             return {
//                 ...state, posts: [action.payload,...state.posts]
//             }
        
//         case DESIGN_LOADING:
//         return {
//             ...state,loading:true
//         }    

//         case GET_DESIGNS:
//         return {
//             ...state,
//             posts: action.payload,
//             loading: false
//         }

//         case GET_DESIGN:
//         return {
//             ...state,
//             post: action.payload,
//             loading: false
//         }

//         case DELETE_DESIGN:
//         return {
//             ...state,
//             posts: state.posts.filter(post => post._id !== action.payload )
//         }

//         default:
//             return state;
//     }
// }