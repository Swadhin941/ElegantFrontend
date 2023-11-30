import React, { useContext, useEffect, useRef, useState } from 'react';
import "./CoverPhoto.css";
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { SharedData } from '../../SharedData/SharedContext';
import toast from 'react-hot-toast';

const CoverPhoto = (props) => {
    const { coverPhotoOptionIcon, handleCoverPhotoOption, profileImgOptionDiv, handleProfileImgOptionDiv } = useContext(SharedData);
    const { tempCoverImg, setTempCoverImg } = props;
    const img = new Image();
    const handleChange = (e) => {
        const type = e.target.files[0].type.split('/')[1];
        if (type.toLowerCase() === "jpeg" || type.toLowerCase() === "png" || type.toLowerCase() === 'jpg') {
            setTempCoverImg(e.target.files[0])
            img.src = URL.createObjectURL(e.target.files[0]);
            handleCoverPhotoOption();
        }
        else {
            toast.error("File should be in jpeg, png or jpg format");
            return;
        }

    }

    const handleCoverSave = () => {
        props.setCoverImgStatus(true);
    }

    const handleCoverPhoto = () => {
        if (coverPhotoOptionIcon) {
            handleCoverPhotoOption();
        }
        if (profileImgOptionDiv) {
            handleProfileImgOptionDiv();
        }
    }
    return (
        <div className='container-fluid p-0'>
            <div className={`coverOptionIconDiv`} onClick={() => handleCoverPhotoOption()}>
                <span><i className={`bi bi-three-dots-vertical ${(tempCoverImg|| props?.coverImg) && "text-white"}`}></i></span>
            </div>
            {
                coverPhotoOptionIcon && <div className={`coverPhotoOptionDiv`}>
                    <div className='btn w-100 btn-light' onClick={() => document.querySelector('.uploadCoverImg').click()}>
                        Upload a Image
                        <input type="file" name='uploadCoverImg' className='uploadCoverImg' hidden onChange={handleChange} />
                    </div>
                    {
                        props?.coverImg && <PhotoProvider>
                            <PhotoView src={props?.coverImg}>
                                <button className='btn w-100 btn-light'>Full screen</button>
                            </PhotoView>
                        </PhotoProvider>

                    }
                </div>
            }
            {
                (props?.coverImg || tempCoverImg) && tempCoverImg ? <>
                    <div className='coverPhotoImgDiv bg-dark p-2' onClick={handleCoverPhoto} style={{ display: "flex", justifyContent: "center" }}>
                        <img src={URL.createObjectURL(tempCoverImg)} className='img-fluid' alt="" style={{ height: "100%", width: "auto" }} />
                    </div>
                    <div className='d-flex justify-content-center mt-2'>
                        <button className='btn mx-2 btn-save text-white' style={{ fontWeight: "600" }} onClick={handleCoverSave}>Save</button>
                        <button className='btn btn-danger' onClick={() => setTempCoverImg(null)}>Cancel</button>
                    </div>
                </> : props?.coverImg ? <div className='coverPhotoImgDiv d-flex justify-content-center bg-dark p-2' onClick={handleCoverPhoto}>
                    <img src={props?.coverImg} alt="" style={{ height: "100%", width: "auto" }} className='img-fluid' />
                </div> :
                    <div className='coverPhotoNoImg' onClick={handleCoverPhoto}>
                        <h5 className='text-white fw-bolder fs-3'>No Cover photo</h5>
                    </div>
            }
        </div>
    );
};

export default CoverPhoto;