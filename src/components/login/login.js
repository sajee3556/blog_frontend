import React, { Component } from "react";
import { connect } from 'react-redux';
import RegisterHeader from "../template/registerHeader";
import Axios from "axios"
import { AUTH_URL } from '../../appConfigConstants';
import { GET_AUTHORIZATION } from "../../redux/actions/types";
import {Link} from 'react-router-dom';
import TextInputGroup from '../template/TextInputGroup';

class login extends Component {
    componentDidMount(){
        localStorage.clear();
    }
    state = { 
           email: '',
           password: '',
           errors: {}
    };

    onChange = e => this.setState({
        [e.target.name]: e.target.value
    });

    handleFormSubmit = async e => {
        e.preventDefault();
        const {email, password} = this.state;

        const user = {
            userName : email,
            password : password
        }

        const authDetails = {
            userName : user.userName,
            token : null
        }
        
        try{
        const res = await Axios.post(`${AUTH_URL}`,user);
        if(res.status === 200){
            localStorage.setItem('token',JSON.stringify(res.data.token));
            localStorage.setItem('userName',JSON.stringify(user.userName));
            authDetails.token = res.data.token
    
            this.props.dispatch({
                type: GET_AUTHORIZATION,
                payload: authDetails
            });
    
            this.props.history.push('/dashboard');
        } else {
            // localStorage.setItem('token','Not valid');
            this.setState({ errors: { email: 'Authentication is not successful!' } });
        }
        }catch(e){
            console.log(e);
            // localStorage.setItem('token','Not valid');
            this.setState({ errors: { email: 'Authentication is not successful!' } });
        }
    }

  render() {
    const { email, password, errors } = this.state;
    return ( 
        <div className ="Container" style = {{ marginLeft : 100 , marginRight : 100 , marginTop : 50 }}>
            <form onSubmit={this.handleFormSubmit}>
                <h3>Log In</h3>

                <TextInputGroup label="Email address" type="email" className="form-control" name="email" placeholder="Enter email" value={email} onChange={this.onChange} error={errors.email} />
                <TextInputGroup label="Password" type="password" className="form-control" name="password" placeholder="Enter password"  value={password} onChange={this.onChange} error={errors.password}/>
            
                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary btn-block">Submit</button>
                <p className="forgot-password text-right">
                    Forgot <Link to="/Register">password?</Link>
                </p>
                <p className="text-center"> Don't you have an account ?</p>
                <RegisterHeader></RegisterHeader>
            </form>
        </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
    dispatch                // ← Add this
 })

export default connect(null, mapDispatchToProps )(login);