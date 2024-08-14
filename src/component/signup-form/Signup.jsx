import { useState } from 'react';
import styles from './Signup.module.scss';
import PropTypes from 'prop-types';
import React from 'react';

export default function SignupForm({ onSubmit, loading, onSignIn }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    birthDate: '',
    confirmPassword: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState(''); 

  const validate = () => {
    const newErrors = {};
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  
    if (!formData.email || !emailPattern.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.password || formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.username) {
      newErrors.username = 'Username is required';
    }
    if (!formData.birthDate) {
      newErrors.birthDate = 'Birth date is required';
    }
    
    return newErrors;
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError(''); // Reset server error before new submission
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      try {
        await onSubmit(formData);
      } catch (error) {
        setServerError(error.message || 'An unexpected error occurred.');
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    }); 
  }; 

  return (
    <div className={styles.form}>
      <h1 className={styles.signup}>Sign Up</h1> 
      <form onSubmit={handleSubmit}>
        <div className={styles.container}>
          <div className={styles.column}>
            <label className={styles.label}>
              <input
                className={styles.input}
                onChange={handleChange}
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                required
                disabled={loading} // Disabled while loading to prevent duplicate submissions
              />
            </label>
            <label className={styles.label}>
              <input
                className={styles.input}
                onChange={handleChange}
                name="email"
                placeholder="Email Address"
                value={formData.email}
                required
                disabled={loading}
              />
              {errors.email && <div className={styles.error}>{errors.email}</div>}
            </label>
            <label className={styles.label}>
              <input
                className={styles.input}
                onChange={handleChange}
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                required
                disabled={loading}
              />
            </label>
          </div>

          <div className={styles.column}>
            <label className={styles.label}>
              <input
                className={styles.input}
                onChange={handleChange}
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                required
                disabled={loading}
              />
            </label>
            <label className={styles.label}>
              <input
                className={styles.input}
                onChange={handleChange}
                name="username"
                placeholder="Username"
                value={formData.username}
                required
                disabled={loading}
              />
            </label>
            <label className={styles.label}>
              <input
                className={styles.input}
                onChange={handleChange}
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                required
                disabled={loading}
              />
              {errors.confirmPassword && <div className={styles.error}>{errors.confirmPassword}</div>}
            </label>
          </div>
        </div>
        
        <div className={styles.buttoncontainer}>
          <input
            className={styles.input}
            onChange={handleChange}
            type="date"
            name="birthDate"
            value={formData.birthDate}
            required
            disabled={loading}
          />
          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? 'Signing up...' : 'Submit'}
          </button>
        </div>
      </form>
        {serverError && <div className={styles.serverError}>{serverError}</div>}
      <button className={styles.signInBtn} onClick={onSignIn} disabled={loading}>
        Already have an account? Log in
      </button>
    </div>
  );
}

SignupForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onSignIn: PropTypes.func,
  loading: PropTypes.bool,
};

SignupForm.defaultProps = {
  loading: false,
};
