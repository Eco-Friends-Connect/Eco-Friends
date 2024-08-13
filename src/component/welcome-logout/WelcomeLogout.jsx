import React from 'react';
import PropTypes from 'prop-types';
import styles from './WelcomeLogout.module.scss';

const WelcomeLogout = ({ firstName, logout }) => {
    return (
        <div className={styles.logoutContainer}>
            <p className={styles.welcomeMessage}>Welcome, {firstName}!</p>
            <button className={styles.logoutButton} onClick={logout}>Logout</button>
        </div>
    );
};

WelcomeLogout.propTypes = {
    firstName: PropTypes.string.isRequired,
    logout: PropTypes.func.isRequired,
};

export default WelcomeLogout;
