import React,{useContext} from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import AuthContext from './auth-context';

const ProtectedRoute = ({ children }) => {
    const { isLoggedIn } = useContext(AuthContext);

    if (!isLoggedIn) {
        return <Navigate to="/login" />;
    }

    return children;
};


ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
