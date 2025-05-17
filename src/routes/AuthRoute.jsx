import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AuthRoute = ({ children }) => {
    const { accessToken } = useSelector(state => state.auth);
    return accessToken ? <Navigate to="/dashboard" replace /> : children;
}
export default AuthRoute;