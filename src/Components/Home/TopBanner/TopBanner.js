import React from 'react';
import "./TopBanner.css";

const TopBanner = () => {
    return (
        <div className='p-0 topBanner'>
            <div className='topBannerContent'>
                <div className="topBannerImgDiv">
                    <img src="https://i.ibb.co/gmvQcYh/Paste-image-removebg-preview-1.png" alt="" className='img-fluid' />
                </div>
                <div className="topBannerTextDiv">
                    <h1 className='mb-0' style={{fontWeight:"700"}}>Listen to the amazing music sound</h1>
                    <p className='mt-0' style={{fontWeight:"600"}}><small>Experience music like never before</small></p>
                </div>
            </div>
        </div>
    );
};

export default TopBanner;          