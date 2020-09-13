// import {useSelector} from 'react-redux';

export default function authHeader(){

    // const token = useSelector(state => {
    //     console.log(state);
    //     debugger;
    //     return state.UserReducer.token});

    const token = JSON.parse(localStorage.getItem('token'));

    if(token && token !== 'Not valid'){
        return { Authorization: 'Bearer ' + token};
    } else{
        return {};
    }
}