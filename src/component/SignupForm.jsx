import React from 'react';
import { useNavigate } from 'react-router-dom';
import Signup from './Signup';
import DateCalendarServerRequest from './SmallCalendar';
import styles from './Signup.module.scss'

function SignupFormPage() {
  const navigate = useNavigate();

  const handleSignupClick = () => {
    navigate('/signup');
  };

  return (
    <div className={styles.page}>
      <h2>Home Page</h2>
      <Signup />
      <DateCalendarServerRequest />
      
    </div>
  );
}

export default SignupFormPage;
