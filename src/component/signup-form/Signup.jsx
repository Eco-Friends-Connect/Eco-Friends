import React, { useState } from 'react';
import styles from './Signup.module.scss';
import PropTypes from 'prop-types';

export default function SignupForm({ onSubmit, loading }) {
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

  const validate = () => {
    const newErrors = {};
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (!formData.email || !emailPattern.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      onSubmit(formData);
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
          />
          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? 'Signing up...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
}

SignupForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

SignupForm.defaultProps = {
  loading: false,
};
