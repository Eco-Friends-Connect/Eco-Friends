import { useContext } from 'react';
import AuthProvider from './auth-context';

export const useAuth = () => {
    const context = useContext(AuthProvider);
    console.log('useAuth context:', context); 
    if (!context) {
        console.error("useAuth must be used within an AuthProvider");
        return {}; 
    }
    return context;
};
