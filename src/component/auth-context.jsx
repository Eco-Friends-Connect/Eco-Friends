import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('loginToken') || sessionStorage.getItem('loginToken');
        setIsLoggedIn(!!token);
    }, []);

    const login = (token, rememberMe) => {
        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem('loginToken', token);
        setIsLoggedIn(true);
    };

    const logout = () => {
        localStorage.removeItem('loginToken');
        sessionStorage.removeItem('loginToken');
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
