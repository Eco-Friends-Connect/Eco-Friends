import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Signup from '../component/signup-form/Signup';
import DateCalendarServerRequest from '../component/SmallCalendar';
import styles from '../component/signup-form/Signup.module.scss';
import config from '../config';
import Popup from '../component/Popup';

const signupUser = async (formData, setError, setLoading, navigate) => {
  const API_URL = config.API_URL;
  setLoading(true);
  try {
    const response = await fetch(`${API_URL}/api/post/create-user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    setLoading(false);

    if (!response.ok) {
      const errorData = await response.json();
      console.log(errorData.error);
      throw new Error(errorData.error || 'Signup failed');
    }

    await response.json();
    navigate('/userororgselect');
  } catch (error) {
    setLoading(false);
    
    const errorMessage = error.message || 'Signup failed. Please try again.';
    setError(errorMessage);
    console.error('Error:', errorMessage);
  }
};

function SignupFormPage() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const SignInUser = () => {
    navigate('/login');
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };


  const handleSubmit = async (formData) => {
    await signupUser(formData, setError, setLoading, navigate);
    if (error) {
      setShowPopup(true);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Signup 
          onSubmit={handleSubmit} 
          loading={loading} 
          onSignIn={SignInUser}
        />
        {showPopup && <Popup message={error} onClose={handleClosePopup} />}
        <div className={styles.calendar}>
          <DateCalendarServerRequest />
        </div>
      </div>
    </div>
  );
}

export default SignupFormPage;
