import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('loginToken') || sessionStorage.getItem('loginToken');
        const storedUsername = localStorage.getItem('username') || sessionStorage.getItem('username');
        setIsLoggedIn(!!token);
        setUsername(storedUsername);
    }, []);

    const login = (token, username, rememberMe) => {
        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem('loginToken', token);
        storage.setItem('username', username);
        setIsLoggedIn(true);
        setUsername(username);
    };

    const logout = () => {
        localStorage.removeItem('loginToken');
        sessionStorage.removeItem('loginToken');
        localStorage.removeItem('username');
        sessionStorage.removeItem('username');
        setIsLoggedIn(false);
        setUsername(null);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, username, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
