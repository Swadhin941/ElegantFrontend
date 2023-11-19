import React, { useContext, useEffect, useState } from 'react';
import "./Register.css";
import useTitle from '../CustomHook/useTitle/useTitle';
import { Link, useNavigate } from 'react-router-dom';
import { SharedData } from '../SharedData/SharedContext';
import toast from 'react-hot-toast';
import { serverUrl } from '../CustomHook/ServerHook/ServerHook';
import useToken from '../CustomHook/useToken/useToken';

const Register = () => {
    useTitle("3legant- Register");
    const { createAccount, user } = useContext(SharedData);
    const [showPassword, setShowPassword] = useState(false);
    
    const [token]= useToken(user?.email);
    const navigate = useNavigate();

    useEffect(()=>{
        if(token){
            navigate('/', {replace: true});
        }
    },[token])

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const fullName = form.fullName.value;
        const email = form.email.value;
        const password = form.password.value;
        const confirmPassword = form.RePassword.value;
        console.log(fullName, email, password, confirmPassword, form.accountType.value);
        if (/(?=.*[\s])/.test(fullName)) {
            toast.error("Full Name has to without space");
            return;
        }
        if (password !== confirmPassword) {
            toast.error("Password does not match");
            return;
        }
        if (password.length < 6) {
            toast.error("Password must be longer than 6 character");
            return;
        }
        if (/(?=.*[\s])/.test(password)) {
            toast.error("Password should not contain space");
            return;
        }
        createAccount(email, password)
            .then(users => {
                fetch(`${serverUrl}/user`, {
                    method: "POST",
                    headers:{
                        "content-type": "application/json"
                    },
                    body:JSON.stringify({fullName, email, role: form.accountType.value, emailStatus: false})
                })
                    .then(res => res.json())
                    .then(data => {
                        if(data.acknowledged){
                            toast.success('Welcome to 3legant');
                        }
                    })
            })
            .catch(error => {
                toast.error(error.message.split('/')[1])
            })

    }

    return (
        <div className='container-fluid loginContainer'>
            <div className='loginContent'>
                <div className='loginImgDiv'>
                    <img src="https://i.ibb.co/6gzR4QQ/login-Headphone.jpg" alt="" />
                </div>
                <div className='card'>
                    <div className="card-body">
                        <h2 className='text-center'>Register</h2>
                        <form className='form mt-2' onSubmit={handleSubmit}>
                            <div className='mt-2'>
                                <label htmlFor="fullName" className='form-label'>Full name:</label>
                                <div className='input-group'>
                                    <input type="text" name='fullName' className='form-control' placeholder='Enter your full name' required />
                                </div>
                            </div>
                            <div className='mt-2'>
                                <label htmlFor="email" className='form-label'>Email:</label>
                                <div className='input-group'>
                                    <input type="email" name='email' className='form-control' placeholder='Enter your email address' required />
                                </div>
                            </div>
                            <div className='mt-2'>
                                <label htmlFor="password" className='form-label'>Password:</label>
                                <div className="input-group">
                                    <input type={showPassword ? "text" : "password"} className='form-control' name='password' placeholder='Enter your password' style={{ borderRight: "0px" }} required />
                                    <span className='input-group-text' onClick={() => setShowPassword(!showPassword)} style={{ backgroundColor: "white" }}><i className={showPassword ? "bi bi-eye" : 'bi bi-eye-slash'}></i></span>
                                </div>
                            </div>
                            <div className='mt-2'>
                                <label htmlFor="RePassword" className='form-label'>Re-type Password:</label>
                                <div className="input-group">
                                    <input type={showPassword ? "text" : "password"} className='form-control' name='RePassword' placeholder='Confirm your password' required />

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