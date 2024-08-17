import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Signup from '../component/signup-form/Signup';
import DateCalendarServerRequest from '../component/SmallCalendar';
import styles from '../component/signup-form/Signup.module.scss';
import config from '../config';
import PopOut from '../component/pop-out/pop-out';

const signupUser = async (formData, setErrorCallback, setLoading, navigate) => {
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
    setErrorCallback(errorMessage);
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
    await signupUser(formData, (errorMessage) => {
      setError(errorMessage);
      setShowPopup(!!errorMessage);
    }, setLoading, navigate);
  };
  
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Signup 
          onSubmit={handleSubmit} 
          loading={loading} 
          onSignIn={SignInUser}
        />
        {showPopup && (
          <PopOut 
            isOpened={showPopup} 
            popOutType="error" 
            onClose={handleClosePopup}
          >
            <p>{error}</p>
          </PopOut>
        )}
        {
          loading && (
            <PopOut isOpened={loading} popOutType="info">
              <p>Signing up...</p>
            </PopOut>
          )
        }
        <div className={styles.calendar}>
          <DateCalendarServerRequest />
        </div>
      </div>
    </div>
  );
}

export default SignupFormPage;
