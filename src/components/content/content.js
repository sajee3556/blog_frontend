import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import {deleteContent} from '../../redux/actions/contentActions'
import {getUserDetails} from '../../redux/actions/userAction';

class Content extends Component {
    
    componentDidMount(){
        const userName = JSON.parse(localStorage.getItem('userName'));
        const userDetails = JSON.parse(localStorage.getItem('userDetails'));
        if(!userDetails)
          this.props.getUserDetails(userName);
    }

    onDeleteClick = id => {
        this.props.deleteContent(id);
    };

    render() {
        const {contentId,title,summary,details,comments,publishedDate,userDetailsId} = this.props.content;
        const userDetails = JSON.parse(localStorage.getItem('userDetails'));
        return (
            <div className="card card-body mb-3">
                <h4>
                    {title}
                    {
                        userDetails && userDetails.userDetailsId === userDetailsId ? (
                                <Link to={`content/edit/${contentId}`}>
                                    <i
                                        className="fas fa-pencil-alt"
                                        style={{
                                            cursor: 'pointer',
                                            float: 'right',
                                            color: 'black',
                                            marginRight: '1rem'
                                        }}
                                    />
                                </Link>
                        ) :
                        null
                    }
                    {' '}
                    {
                        userDetails && userDetails.userDetailsId === userDetailsId ? (
                            <i
                            className="fas fa-times fa-fw"
                            style={{cursor: 'pointer', float: 'right', color: 'red'}}
                            onClick={this.onDeleteClick.bind(this,contentId)}
                            />
                        ) :
                        null
                    }
                </h4>
                   <ul className="list-group">
                        <li className="list-group-item">Summary: {summary}</li>
                        <li className="list-group-item">Details: {details}</li>
                        <li className="list-group-item">Published Date: {publishedDate}</li>
                        <li className="list-group-item">Comments: {comments}</li>
                    </ul>
            </div>
        )
    }
}

Content.propTypes = {
    content: PropTypes.object.isRequired,
    getUserDetails: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    contents : state.ContentReducer.contents,
    userName : state.UserReducer.userName,
    userDetails : state.UserReducer.userDetails
});

export default connect(mapStateToProps,{getUserDetails,deleteContent})(Content);