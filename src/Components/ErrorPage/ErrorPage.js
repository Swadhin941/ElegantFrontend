import React, { useContext } from 'react';
import { SharedData } from '../SharedData/SharedContext';

const ErrorPage = () => {
    const { Logout } = useContext(SharedData);
    return (
        <div className='container-fluid'>
            <p><span onClick={()=>Logout()} style={{textDecoration:"underline", color:"blue"}}>Logout</span> first</p>
        </div>
    );
};

export default ErrorPage;