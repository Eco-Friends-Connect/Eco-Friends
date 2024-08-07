import React from 'react';
import PropTypes from 'prop-types';
import styles from './WelcomeLogout.module.scss';

const WelcomeLogout = ({ username, logout }) => {
    return (
        <div className={styles.logoutContainer}>
            <p className={styles.welcomeMessage}>Welcome, {username}!</p>
            <button className={styles.logoutButton} onClick={logout}>Logout</button>
        </div>
    );
};

WelcomeLogout.propTypes = {
    username: PropTypes.string.isRequired,
    logout: PropTypes.func.isRequired,
};

export default WelcomeLogout;
