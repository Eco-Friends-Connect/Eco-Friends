import React from 'react';
import { useAuth } from '../component/auth-context';
import WelcomeLogout from '../component/welcome-logout/WelcomeLogout';

export default function EcoChat() {
    const { isLoggedIn, username, logout } = useAuth();
    
    return (
        <div>
            {isLoggedIn ? (
                <WelcomeLogout username={username} logout={logout} />
            ) : (
                <p></p>
            )}
            <h1>Chat here!</h1>
        </div>
    );
}