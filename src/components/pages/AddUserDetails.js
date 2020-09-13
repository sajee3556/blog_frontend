import React, { Component } from 'react';
import { connect } from 'react-redux';
import {addUserDetails} from '../../redux/actions/userAction';

class AddUserDetails extends Component {
    state = { 
        sureName: '',
        description: '',
        country: '',
        errors: {} 
    };

    onChange = e => this.setState({
        [e.target.name]: e.target.value
    });

    handleFormSubmit = async e => {
        e.preventDefault();
        const {sureName, description, country } = this.state;
        const userName = JSON.parse(localStorage.getItem('userName'));

        const userDetails = {
            name : sureName,
            description : description,
            country: country,
            userName: userName
        }
        this.props.addUserDetails(userDetails, this.props);

        this.setState ({ 
            sureName: '',
            description: '',
            country: '',
            errors: {} 
        });

        this.props.history.push('/dashboard');
    }

    render() {
        const {sureName, description, country, errors} = this.state;
        return (
            <div className ="Container" style = {{ marginLeft : 100 , marginRight : 100 , marginTop : 50 }}>
                <div>
                    <h4>You need to complete your profile before you publish your new contents! </h4>
                </div>
                <br/>
                <form onSubmit={this.handleFormSubmit}>
                    <h3>User Details</h3>

                    <div className="form-group">
                        <label>Name </label>
                        <input type="text" className="form-control" name="sureName" placeholder="Enter Name" value={sureName} onChange={this.onChange} error={errors.sureName} required/>
                    </div>

                    <div className="form-group">
                        <label>Description </label>
                        <input type="text" className="form-control" name="description" placeholder="Enter Description" value={description} onChange={this.onChange} error={errors.description} required/>
                    </div>

                    <div className="form-group">
                        <label>Country </label>
                        <input type="text" className="form-control" name="country" placeholder="Enter Country" value={country} onChange={this.onChange} error={errors.country} required/>
                    </div>

                    <button type="submit" className="btn btn-primary btn-block">Submit</button>
                </form>

            </div>

        )
    }
}

const mapStateToProps = (state) => ({
    userName : state.UserReducer.userName
});

export default connect(mapStateToProps,{addUserDetails}) (AddUserDetails);