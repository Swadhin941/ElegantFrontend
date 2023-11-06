import React from 'react';
import "./Navbar.css";
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbarBackground">
            <div className="container-fluid navbarContainer">
                <div>
                    <Link to={'/'} className='navbar-brand' style={{fontWeight:"600"}}>3legant</Link>
                </div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse navbarContent" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink to={'/'} className={'nav-link'}>Home</NavLink>
                        </li>                    
                        <li className="nav-item">
                            <NavLink to={'/login'} className={'nav-link'} style={{marginTop:"-0.23rem"}}><i className='bi bi-person-circle fs-4' ></i></NavLink>
                        </li>                                      
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;