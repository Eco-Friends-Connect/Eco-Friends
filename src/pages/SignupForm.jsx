import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Signup from '../component/signup-form/Signup';
import DateCalendarServerRequest from '../component/SmallCalendar';
import styles from '../component/signup-form/Signup.module.scss';
import config from '../config';
import React from 'react';


const signupUser = (formData, setError, setLoading, navigate) => {
  const API_URL = config.API_URL;
  setLoading(true);
  fetch(`${API_URL}/api/post/create-user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
  .then((response) => {
    setLoading(false);
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Signup failed');
    }
  })
  .then(() => {
    navigate('/userororgselect'); 
  })
  .catch((error) => {
    setLoading(false);
    setError('Signup failed. Please try again.');
    console.error('Error:', error);
  });
};


function SignupFormPage() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const SignInUser = () => {
    navigate('/login');
  };
  
  return (
    <div className={styles.page}>
      {error && <div className={styles.error}>{error}</div>}
      <Signup 
        onSubmit={(formData) => signupUser(formData, setError, setLoading, navigate)} 
        loading={loading} 
        onSignIn={SignInUser}
      />
      <div className={styles.calendar}>
        <DateCalendarServerRequest />
      </div>
    </div>
  );
}

export default SignupFormPage;
