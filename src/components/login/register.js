import React, { Component } from "react";
import { connect } from 'react-redux';
import Axios from "axios"
import { REGISTER_URL } from '../../appConfigConstants';
import { ADD_USER } from "../../redux/actions/types";
import TextInputGroup from '../template/TextInputGroup';

class Register extends Component {
    state = { 
           email: '',
           password: '',
           confirmPassword: '',
           errors: {} 
    };

    onChange = e => this.setState({
        errors: {},
        [e.target.name]: e.target.value
    });

    handleFormSubmit = async e => {
        e.preventDefault();
        const {email, password, confirmPassword } = this.state;

        if(password !== confirmPassword){
            this.setState({ errors: { confirmPassword: 'Password is not match!' } });
            return;
        }

        const user = {
            userName : email,
            password : password
        }
        
        try{
        const res = await Axios.post(`${REGISTER_URL}`,user);
        if(res.status === 200){
    
            this.props.dispatch({
                type: ADD_USER,
                payload: res.data
            });
    
            this.props.history.push('/');
        } else {
            // localStorage.setItem('token','Not valid');
            this.setState({ errors: { email: 'Registration is not successful!' } });
            this.props.history.push('/Register');
        }
        }catch(e){
            console.log(e);
            // localStorage.setItem('token','Not valid');
            this.setState({ errors: { email: 'Registration is not successful!' } });
            this.props.history.push('/Register');
        }
    }


  render() {
    const { email, password, confirmPassword, errors } = this.state;
    return ( 
        <div className ="Container" style = {{ marginLeft : 100 , marginRight : 100 , marginTop : 50 }}>
            <form onSubmit={this.handleFormSubmit}>
                <h3>Sign Up</h3>
                <TextInputGroup label="Email address" type="email" className="form-control" name="email" placeholder="Enter email" value={email} onChange={this.onChange} error={errors.email} />
                <TextInputGroup label="Password" type="password" className="form-control" name="password" placeholder="Enter password"  value={password} onChange={this.onChange} error={errors.password} />
                <TextInputGroup label="Confirm Password" type="password" className="form-control" name="confirmPassword" placeholder="Re Enter password"  value={confirmPassword} onChange={this.onChange} error={errors.confirmPassword} />
                <button type="submit" className="btn btn-primary btn-block">Submit</button>
            </form>
        </div>
    );
  }
}

export default connect(null)(Register);