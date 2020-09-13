import Axios from "axios"
import { USER_DETAILS_URL } from '../../appConfigConstants';
import authHeader from '../../components/login/authHeader';
import { GET_USER_DETAILS, ADD_USER_DETAILS } from "./types";

export const getUserDetails = (userName) => async dispatch => {
    const res = await Axios.get(`${USER_DETAILS_URL}/getUserDetails?userName=`+userName,{ "headers" :authHeader() });
    if(res.status === 200){
        localStorage.setItem('userDetails',JSON.stringify(res.data));
        dispatch({
            type: GET_USER_DETAILS,
            payload: res.data
        });
    }
} 

export const addUserDetails = (userDetails) => async dispatch => {
    try{
        const res = await Axios.post(`${USER_DETAILS_URL}/saveUserDetails`,userDetails,{ "headers" :authHeader() });
        if(res.status === 200){ 
            localStorage.setItem('userDetails',JSON.stringify(res.data));
            dispatch({
                type: ADD_USER_DETAILS,
                payload: res.data
            });
        } 
    }catch(e){
        console.log(e);
    }
}