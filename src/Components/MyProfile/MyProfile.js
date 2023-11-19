import React, { useContext } from 'react';
import CoverPhoto from './CoverPhoto/CoverPhoto';
import useTitle from '../CustomHook/useTitle/useTitle';
import "./MyProfile.css";
import 'react-html5-camera-photo/build/css/index.css';
import { SharedData } from '../SharedData/SharedContext';

const MyProfile = () => {
    useTitle('3legant- Profile');
    const { coverPhotoOptionIcon, handleCoverPhotoOption, user } = useContext(SharedData);
    const handleCoverPhoto = ()=>{
        if(coverPhotoOptionIcon){
            handleCoverPhotoOption();
        }
    }


    return (
        <div className='container-fluid p-0'>
            <CoverPhoto></CoverPhoto>
            <div className="row" onClick={handleCoverPhoto}>
                <div className="col-12 col-md-12 col-lg-12">
                    <div className='d-flex justify-content-between'>
                        <div className='profileInfo'>
                            <div className='profileImgDiv'>
                                <img src="https://i.ibb.co/bmVqbdY/empty-person.jpg" alt="" className='img-fluid' />
                            </div>
                            <div>
                                <h5 className='fw-bold mb-0'>{user?.displayName}</h5>
                                <p className='mt-0 text-muted'><small>Bio: Write your bio</small></p>
                            </div>
                        </div>
                        <div className='shopProgressBar'>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;