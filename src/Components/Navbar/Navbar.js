import React, { useContext } from 'react';
import "./Navbar.css";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { SharedData } from '../SharedData/SharedContext';

const Navbar = () => {
    const { handleNavMiniWindow, navbarMiniWindow, user, Logout, coverPhotoOptionIcon, handleCoverPhotoOption, handleProfileImgOptionDiv, profileImgOptionDiv } = useContext(SharedData);
    const navigate= useNavigate();
    const handleCoverPhoto= ()=>{
        if(coverPhotoOptionIcon){
            handleCoverPhotoOption();
        }
        if(profileImgOptionDiv){
            handleProfileImgOptionDiv();
        }
    }
    return (
        <nav className="navbar navbar-expand-lg navbarBackground" onClick={handleCoverPhoto}>
            <div className="container-fluid navbarContainer">
                <div>
                    <Link to={'/'} className='navbar-brand' style={{ fontWeight: "600" }}>3legant</Link>
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
                            {
                                user ? <div className='mt-1' onClick={() => handleNavMiniWindow()} style={{ height: "30px", width: "30px" }}><img src={user?.photoURL} className='img-fluid rounded rounded-circle' alt={user?.displayName+" picture"} /></div> : <NavLink to={'/login'} className={'nav-link'} style={{ marginTop: "-0.23rem" }}><i className='bi bi-person-circle fs-4' ></i></NavLink>
                            }

                        </li>
                    </ul>
                    {
                        user && navbarMiniWindow && <div className='profileDiv'>
                            <button className='btn w-100 border border-dark' onClick={()=>navigate('/profile')}>My Profile</button>
                            <button className='btn w-100 border border-dark'>My cart</button>
                            <button className='btn w-100 border border-dark' onClick={() => Logout()}>Logout</button>
                        </div>
                    }

                </div>
            </div>
        </nav>
    );
};

export default Navbar;