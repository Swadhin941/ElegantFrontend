import React, { useContext, useEffect, useRef } from 'react';
import CoverPhoto from './CoverPhoto/CoverPhoto';
import useTitle from '../CustomHook/useTitle/useTitle';
import "./MyProfile.css";
import 'react-html5-camera-photo/build/css/index.css';
import { SharedData } from '../SharedData/SharedContext';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { useState } from 'react';
import toast from 'react-hot-toast';
import useAxiosSecure from '../CustomHook/useAxiosSecure/useAxiosSecure';
import errorNotify from '../CustomHook/errorNotify/errorNotify';
import CreateShop from '../Modals/CreateShop/CreateShop';

const MyProfile = () => {
    useTitle('3legant- Profile');
    const { coverPhotoOptionIcon, handleCoverPhotoOption, user, handleProfileImgOptionDiv, profileImgOptionDiv, Logout, updateProfilePicture } = useContext(SharedData);
    const [tempProfileImg, setTempProfileImg] = useState(null);
    const [axiosSecure] = useAxiosSecure();
    const [userData, setUserData] = useState(null);
    const [bioField, setBioField] = useState(false);
    const bioRef = useRef();
    const [tempCoverImg, setTempCoverImg] = useState(null);
    const [coverImgStatus, setCoverImgStatus] = useState(false);

    //Profile Information Get
    useEffect(() => {
        axiosSecure.get(`/user?user=${user?.email}`)
            .then(res => res.data)
            .then(data => {
                setUserData(data);
            })
            .catch(error => {
                const code = error.message.split('code ')[1];
                errorNotify(code);
            })

    }, [])

    useEffect(() => {
        if (coverImgStatus) {
            console.log(tempCoverImg);
            const formData = new FormData();
            formData.append('image', tempCoverImg);
            fetch(`https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_imgBB}`, {
                method: "POST",
                body: formData
            })
                .then(res => res.json())
                .then(imgData => {
                    if (imgData.success) {
                        axiosSecure.put(`/updateCoverPhoto?user=${user?.email}`, {
                            coverImg: imgData.data.url
                        })
                            .then(res => res.data)
                            .then(data => {
                                if (data.modifiedCount >= 1) {
                                    let temp = { ...userData };
                                    temp.coverImg = imgData.data.url;
                                    setTempCoverImg(null);
                                    setUserData(temp);
                                    setCoverImgStatus(false);
                                }
                            })
                    }
                })
        }
    }, [coverImgStatus])

    const handleUpdateProfileImg = () => {
        const formData = new FormData();
        formData.append('image', tempProfileImg)
        fetch(`https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_imgBB}`, {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    updateProfilePicture(imgData.data.url)
                        .then(() => {
                            axiosSecure.put(`/updateProfilePhoto?user=${user?.email}`, { photoURL: imgData.data.url })
                                .then(res => res.data)
                                .then(data => {
                                    if (data.modifiedCount >= 1) {
                                        toast.success("Profile picture updated successfully");
                                        setTempProfileImg(null);
                                    }
                                })
                                .catch(error => {
                                    const err = error.message.split('code ')[1];
                                    errorNotify(err);
                                })
                        })
                }
            })
    }

    const handleCoverPhoto = () => {
        if (coverPhotoOptionIcon) {
            handleCoverPhotoOption();
        }
        if (profileImgOptionDiv) {
            handleProfileImgOptionDiv();
        }
    }

    const handleProfileImgChange = (e) => {
        const type = e.target.files[0].type.split('/')[1];
        if (type.toLowerCase() === 'png' || type.toLowerCase() === 'jpeg' || type.toLowerCase() === 'jpg') {
            setTempProfileImg(e.target.files[0]);
            handleProfileImgOptionDiv();
        }
        else {
            toast.error("File should be in png, jpg or jpeg format");
            return;
        }
    }

    const handleKey = (e) => {
        if (e.key === 'Enter') {
            if (!bioRef.current.value) {
                toast.error("Please write something in your bio");
                return;
            }
            if (bioRef.current.value.trim() === "") {
                toast.error("You cannot leave it empty");
                return;
            }
            else {
                axiosSecure.put(`/updateBio?user=${user?.email}`, { bio: bioRef.current.value })
                    .then(res => res.data)
                    .then(data => {
                        if (data.modifiedCount >= 1) {
                            let tempData = { ...userData };
                            tempData.bio = bioRef.current.value;
                            bioRef.current.value = null;
                            setBioField(false);
                            setUserData(tempData);
                        }
                    })
            }
        }
    }
    console.log(userData);

    return (
        <div className='container-fluid p-0'>
            <CoverPhoto coverImg={userData?.coverImg} tempCoverImg={tempCoverImg} setTempCoverImg={setTempCoverImg} setCoverImgStatus={setCoverImgStatus} ></CoverPhoto>
            <div className="row" onClick={handleCoverPhoto}>
                <div className="col-12 col-md-12 col-lg-12">
                    <div className='d-flex justify-content-between'>
                        <div className='profileInfo'>
                            <div>
                                <div className='profileImgDiv' onClick={() => handleProfileImgOptionDiv()}>
                                    <img src={tempProfileImg ? `${URL.createObjectURL(tempProfileImg)}` : user?.photoURL ? user?.photoURL : 'https://i.ibb.co/bmVqbdY/empty-person.jpg'} alt="profile_image" className='img-fluid' />
                                </div>
                                {
                                    tempProfileImg && <div>
                                        <button className='btn btn-save me-2' onClick={handleUpdateProfileImg}>Save</button>
                                        <button className='btn btn-danger' onClick={() => setTempProfileImg(null)}>Cancel</button>
                                    </div>
                                }
                            </div>


                            <div >
                                <h5 className='fw-bold mb-0'>{user?.displayName}</h5>
                                <p className='mt-0 text-muted'><small>Bio: {bioField ? <span> <input type="text" name='bio' className='form-control' onKeyDown={handleKey} required ref={bioRef} /> </span> : userData?.bio ? userData?.bio : "Write your bio"}</small> {!bioField && <i className='bi bi-box-arrow-in-down-left ms-1 text-dark' onClick={() => setBioField(!bioField)}></i>} </p>
                            </div>
                        </div>
                        <div className='shopProgressBar my-auto me-2'>
                            <button data-bs-target="#CreateShop" data-bs-toggle="modal" className='btn btn-primary'>Create a shop</button>
                        </div>
                        <CreateShop></CreateShop>
                    </div>
                </div>
            </div>
            {
                profileImgOptionDiv && <div className='profileImgOption' >
                    <button className='btn' onClick={() => document.querySelector(".uploadProfileImg").click()}>Upload Photo</button>
                    <input type="file" name='uploadProfileImg' className='uploadProfileImg' hidden onChange={handleProfileImgChange} />
                    <PhotoProvider>
                        <PhotoView src={user?.photoURL ? user?.photoURL : "'https://i.ibb.co/bmVqbdY/empty-person.jpg'"} >
                            <button className='btn'>Full screen</button>
                        </PhotoView>
                    </PhotoProvider>
                </div>
            }
        </div>
    );
};

export default MyProfile;