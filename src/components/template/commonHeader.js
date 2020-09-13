import React from 'react';
import {Link} from "react-router-dom";

const Header = props => {
    const {branding} = props;
    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-danger mb-3 py-0">
            <div className="container">
                <Link to="/dashboard" className="nav-link text-white mb-auto">
                    <i className="fas fa-home">{branding}</i>
                </Link>
                <div>
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to="/content/add" className="nav-link">
                                <i className="fas fa-plus">Add Contents</i>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/" className="nav-link">
                                 <i className="fas fa-sign-out-alt">Logout</i>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
};



export default Header;