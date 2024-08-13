import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import AuthContext from './auth-context';

// const AuthContext = createContext();


function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [firstName, setfirstname] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('loginToken') || sessionStorage.getItem('loginToken');
        const storedfirstname = localStorage.getItem('firstName') || sessionStorage.getItem('firstName');
        setIsLoggedIn(!!token);
        setfirstname(storedfirstname);
    }, []);

    const login = (token, firstName, rememberMe) => {
        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem('loginToken', token);
        storage.setItem('firstName', firstName);
        setIsLoggedIn(true);
        setfirstname(firstName);
    };

    const logout = () => {
        localStorage.removeItem('loginToken');
        sessionStorage.removeItem('loginToken');
        localStorage.removeItem('firstName');
        sessionStorage.removeItem('firstName');
        setIsLoggedIn(false);
        setfirstname(null);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, firstName, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthProvider;