import React, { use } from 'react';
import { AuthContext } from '../contexts/AuthContext/AuthContext';
import { Navigate } from 'react-router';

const PrivateRoutes = ({children}) => {
    const {user} = use(AuthContext)
    if(user) {
        return children;
    }
    return <Navigate to="/login"></Navigate>
    
};

export default PrivateRoutes;