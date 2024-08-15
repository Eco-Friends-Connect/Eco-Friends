import React from 'react';
import PropTypes from 'prop-types';
import styles from './WelcomeLogout.module.scss';

const WelcomeLogout = ({ firstName, logout }) => {
    return (
        <>
            <li className={styles.a}>Welcome, {firstName}!</li>
            <li> <button className={styles.a} onClick={logout}>Logout</button></li>
            
        </>
    );
};

WelcomeLogout.propTypes = {
    firstName: PropTypes.string.isRequired,
    logout: PropTypes.func.isRequired,
};

export default WelcomeLogout;
