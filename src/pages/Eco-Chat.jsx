import React, {useContext} from 'react';
import WelcomeLogout from '../component/welcome-logout/WelcomeLogout';
import AuthContext from '../component/auth-context';

export default function EcoChat() {
    const { isLoggedIn, firstName, logout } = useContext(AuthContext);
    
    return (
        <div>
            {isLoggedIn ? (
                <WelcomeLogout firstName={firstName} logout={logout} />
            ) : (
                <p></p>
            )}
            <h1>Chat here!</h1>
        </div>
    );
}