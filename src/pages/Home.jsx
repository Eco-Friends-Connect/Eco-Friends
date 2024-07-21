import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.scss';

function Home() {
  const navigate = useNavigate();

  const handleSignupClick = () => {
    navigate('/signup');
  };

  return (
    <div>
      <h2>Home Page</h2>
      <button className={styles.signupButton} onClick={handleSignupClick}>
        Sign up for help
      </button>
    </div>
  );
}

export default Home;