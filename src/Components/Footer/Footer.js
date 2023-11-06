import React from 'react';
import { Link } from 'react-router-dom';
import "./Footer.css";

const Footer = () => {
    const handleSocial= (data)=>{
        if(data==="instagram"){
            window.location.href= "https://www.instagram.com/swadhin_ghosh0013/";
        }
        if(data==="linkedin"){
            window.location.href= "https://www.linkedin.com/in/swadhin-g-08b1a1101/";
        }
        if(data==="facebook"){
            window.location.href="https://www.facebook.com/swadhinghosh0013/";
        }
    }

    return (
        <div className='container-fluid footerContainer'>
            <div className="row">
                <div className="col-12 col-md-12 col-lg-12">
                    <div className='footerFirstContent'>
                        <div>
                            <Link to={'/'} className='navbar-brand text-white me-2'>3legant</Link> | <span className='d-inline-block ms-2 text-white'>Headphone Store</span>
                        </div>
                        <div className='footerNavContent'>
                            <Link to={'/'}>Home</Link>
                            <Link to={'/'}>Contact us</Link>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-12 col-lg-12 mt-3">
                    <hr className='w-100 text-white' />
                </div>
                <div className="col-12 col-md-12 col-lg-12">
                    <div className='d-flex justify-content-between'>
                        <div>
                            <p className='text-white'>Copyright <i className="bi bi-c-circle" style={{fontSize:"12px"}}></i> {new Date().getFullYear()} 3legant. <small>All right reserved</small></p>
                        </div>
                        <div className='socialConnect'>
                            <i onClick={()=>handleSocial('instagram')} className='bi bi-instagram text-white'></i>
                            <i onClick={()=>handleSocial("linkedin")} className='bi bi-linkedin text-white'></i>
                            <i onClick={()=>handleSocial("facebook")} className='bi bi-facebook text-white'></i>
                        </div>
                    </div>
                </div>  
            </div>
        </div>
    );
};

export default Footer;