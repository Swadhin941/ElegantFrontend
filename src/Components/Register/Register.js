import React, { useState } from 'react';
import "./Register.css";
import useTitle from '../CustomHook/useTitle/useTitle';
import { Link } from 'react-router-dom';

const Register = () => {
    useTitle("3legant- Register");
    const [showPassword, setShowPassword] = useState(false);
    return (
        <div className='container-fluid loginContainer'>
            <div className='loginContent'>
                <div className='loginImgDiv'>
                    <img src="https://i.ibb.co/6gzR4QQ/login-Headphone.jpg" alt="" />
                </div>
                <div className='card'>
                    <div className="card-body">
                        <h2 className='text-center'>Register</h2>
                        <form className='form mt-2'>
                            <div className='mt-2'>
                                <label htmlFor="fullName" className='form-label'>Full name:</label>
                                <div className='input-group'>
                                    <input type="text" name='fullName' className='form-control' required />
                                </div>
                            </div>
                            <div className='mt-2'>
                                <label htmlFor="email" className='form-label'>Email:</label>
                                <div className='input-group'>
                                    <input type="email" name='email' className='form-control' required />
                                </div>
                            </div>
                            <div className='mt-2'>
                                <label htmlFor="password" className='form-label'>Password:</label>
                                <div className="input-group">
                                    <input type={showPassword ? "text" : "password"} className='form-control' name='password' style={{ borderRight: "0px" }} required />
                                    <span className='input-group-text' onClick={() => setShowPassword(!showPassword)} style={{ backgroundColor: "white" }}><i className={showPassword ? "bi bi-eye" : 'bi bi-eye-slash'}></i></span>
                                </div>
                            </div>
                            <div className='mt-2'>
                                <label htmlFor="RePassword" className='form-label'>Re-type Password:</label>
                                <div className="input-group">
                                    <input type={showPassword ? "text" : "password"} className='form-control' name='RePassword' required />

                                </div>
                            </div>
                            <div className='mt-2'>
                                Select account type: <select name="accountType" id="accountType" className='form-select' defaultValue={'buyer'}>
                                    <option value="buyer" defaultChecked>Buyer</option>
                                    <option value="seller">Seller</option>
                                </select>
                            </div>
                            <div className='mt-2'>
                                <button className='btn btn-secondary d-flex justify-content-center w-100'>Register</button>
                            </div>
                            <div className='mt-2'>
                                <p>Already have a account? <Link to={'/login'}>Click here</Link></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;