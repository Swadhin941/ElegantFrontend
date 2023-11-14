import React from 'react';
import { useNavigate } from 'react-router-dom';

const Forbidden = () => {
    const navigate = useNavigate();
    return (
        <div className='container-fluid'>
            <h1>Forbidden Page</h1>
            <button className='btn' onClick={()=>navigate('/', {replace:true})}>Go to home page</button>
        </div>
    );
};

export default Forbidden;