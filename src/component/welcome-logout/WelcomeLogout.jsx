import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './WelcomeLogout.module.scss';
import PropTypes from 'prop-types';

export default function WelcomeLogout({ firstName, hideWelcome, logout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); 
    navigate('/home'); 
  };

  return (
    <>
      {!hideWelcome && (
        <li className={styles.a}>Welcome, {firstName}</li>
      )}
      <li>
        <button className={styles.a} onClick={handleLogout}>Logout</button>
      </li>
    </>
  );
}




WelcomeLogout.propTypes = {
    firstName: PropTypes.string.isRequired,
    logout: PropTypes.func.isRequired,
    hideWelcome: PropTypes.bool,
};

