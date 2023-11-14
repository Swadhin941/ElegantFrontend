import React, { useContext } from 'react';
import { SharedData } from '../SharedData/SharedContext';
import { useLocation } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const {user, loading}= useContext(SharedData);
    const location = useLocation();

    
};

export default PrivateRoute;