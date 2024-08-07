import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../component/auth-context';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ children }) => {
    const { isLoggedIn } = useAuth();

    if (!isLoggedIn) {
        return <Navigate to="/login" />;
    }

    return children;
};


ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
