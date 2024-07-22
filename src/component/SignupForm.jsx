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
    
    <body className={styles.page}>
      
      <Signup />
      <div className={styles.calendar}>
        <DateCalendarServerRequest></DateCalendarServerRequest>
      </div>
      
    </body>
  );
}

export default SignupFormPage;
