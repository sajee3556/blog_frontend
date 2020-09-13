import { GET_AUTHORIZATION, GET_USER_DETAILS, ADD_USER, ADD_USER_DETAILS } from "../actions/types";

const initialState = {
    userName : null,
    token : null,
    userDetails : null
}

export default function(state=initialState, action){
    switch(action.type){
        case GET_AUTHORIZATION:
           return{
            ...state,
            userName : action.payload.userName,
            token : action.payload.token
           }
        case GET_USER_DETAILS:
            return{
              ...state,
              userDetails : action.payload
            }
        case ADD_USER:
            return{
                ...state,
                userName : action.payload.userName
            }
        case ADD_USER_DETAILS:
            return{
                ...state,
                userDetails : action.payload.userName
            }    
        default:
         return state;
    }
}