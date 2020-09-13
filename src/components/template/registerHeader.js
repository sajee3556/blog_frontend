import React from 'react';
import {Link} from 'react-router-dom';

function RegisterHeader() {
    return(
        <nav className="navbar navbar-dark bg-primary">
            <div className="row col-12 d-flex justify-content-center text-white">
            <Link className="btn btn-pink text-white
            " to="/Register"> Register </Link>
            </div>
        </nav>
    )
}
export default RegisterHeader;