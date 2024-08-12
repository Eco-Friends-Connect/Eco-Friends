import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {useAuth} from './auth-content-creation.jsx';

const AuthContext = createContext();


const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [firstname, setfirstname] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('loginToken') || sessionStorage.getItem('loginToken');
        const storedfirstname = localStorage.getItem('firstname') || sessionStorage.getItem('firstname');
        setIsLoggedIn(!!token);
        setfirstname(storedfirstname);
    }, []);

    const login = (token, firstname, rememberMe) => {
        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem('loginToken', token);
        storage.setItem('firstname', firstname);
        setIsLoggedIn(true);
        setfirstname(firstname);
    };

    const logout = () => {
        localStorage.removeItem('loginToken');
        sessionStorage.removeItem('loginToken');
        localStorage.removeItem('firstname');
        sessionStorage.removeItem('firstname');
        setIsLoggedIn(false);
        setfirstname(null);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, firstname, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthProvider;