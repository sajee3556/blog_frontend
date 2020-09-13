import { GET_CONTENTS, ADD_CONTENT, UPDATE_CONTENT, DELETE_CONTENT, GET_CONTENT } from "./types";
import Axios from "axios"
import { CONTENT_URL } from '../../appConfigConstants';
import authHeader from '../../components/login/authHeader';

export const getContents = () => async dispatch => {
    const res = await Axios.get(`${CONTENT_URL}/getAllContents`,{ "headers" :authHeader() });
    dispatch({
        type: GET_CONTENTS,
        payload: res.data
    });
}

export const addContent = (content) => async dispatch => {
    try{
        const res = await Axios.post(`${CONTENT_URL}/saveContent`,content,{ "headers" :authHeader() });
        if(res.status === 200){
            dispatch({
                type: ADD_CONTENT,
                payload: res.data
            });
        } 
    }catch(e){
        console.log(e);
    }
}

export const updateContent = (content) => async dispatch => {
    try{
        const res = await Axios.post(`${CONTENT_URL}/saveContent`,content,{ "headers" :authHeader() });
        if(res.status === 200){
            dispatch({
                type: UPDATE_CONTENT,
                payload: res.data
            });
        } 
    }catch(e){
        console.log(e);
    }
}

export const getContent = (contentId) => async dispatch => {
    const res = await Axios.get(`${CONTENT_URL}/getContentByContentId?contentId=`+contentId,{ "headers" :authHeader() });
    dispatch({
        type: GET_CONTENT,
        payload: res.data
    });
}

export const deleteContent = (contentId) => async dispatch => {
    const res = await Axios.delete(`${CONTENT_URL}/deleteContent?contentId=`+ contentId,{ "headers" :authHeader() });
    if(res.status === 200) {
        dispatch({
            type: DELETE_CONTENT,
            payload : contentId
        });
    }   
}