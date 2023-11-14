import React from 'react';
import { useNavigate } from 'react-router-dom';

const PageNotFound = () => {
    const navigate = useNavigate();
    return (
        <div className='container-fluid'>
            <h1>Page Not Found</h1>
            <button className='btn' onClick={() => navigate('/', { replace: true })}>Go to home page</button>
        </div>
    );
};

export default PageNotFound;