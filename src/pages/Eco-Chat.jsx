import React from 'react';
import { useAuth } from '../component/auth-content-creation';
import WelcomeLogout from '../component/welcome-logout/WelcomeLogout';

export default function EcoChat() {
    const { isLoggedIn, firstname, logout } = useAuth();
    
    return (
        <div>
            {isLoggedIn ? (
                <WelcomeLogout firstname={firstname} logout={logout} />
            ) : (
                <p></p>
            )}
            <h1>Chat here!</h1>
        </div>
    );
}