import { GET_CONTENTS, GET_CONTENT, ADD_CONTENT, UPDATE_CONTENT, DELETE_CONTENT } from "../actions/types";

const initialState = {
    contents : [],
    content : []
}

export default function(state=initialState, action){
    switch(action.type){
        case GET_CONTENTS:
          return{
            ...state,
            contents : action.payload
          }
        case GET_CONTENT:
          return{
            ...state,
            content : action.payload
          } 
        case ADD_CONTENT:
          return{
            ...state,
            contents : [...state.contents,action.payload]
          }
        case UPDATE_CONTENT:
          return{
            ...state,
            contents: state.contents.map(content =>
                    (content.contentId === action.payload.id ? (content = action.payload ) : content))
          }
        case DELETE_CONTENT:
          return{
            ...state,
            contents: state.contents.filter(content => content.contentId !== action.payload) 
          }
        default:
         return state;
    }
}