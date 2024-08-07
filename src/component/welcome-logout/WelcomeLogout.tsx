import React from 'react';
import styles from './WelcomeLogout.module.scss';

interface WelcomeLogoutProps {
    username: string;
    logout: () => void;
}

const WelcomeLogout: React.FC<WelcomeLogoutProps> = ({ username, logout }) => {
    return (
        <div className={styles.logoutContainer}>
            <p className={styles.welcomeMessage}>Welcome, {username}!</p>
            <button className={styles.logoutButton} onClick={logout}>Logout</button>
        </div>
    );
};

export default WelcomeLogout;