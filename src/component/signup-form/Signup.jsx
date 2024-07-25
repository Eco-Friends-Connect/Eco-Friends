
import styles from './Signup.module.scss';
import { useState } from 'react';

export default function SignupForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    birthDate: '',
    confirmPassword: '',
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  return (
    <>
    <div className={styles.form}>
    <h1 className={styles.signup}>Sign Up</h1>
    <form onSubmit={handleSubmit} >
      <div className={styles.container}>
        <div className={styles.column}>
          <label className={styles.label}>
            <input className={styles.input} onChange={handleChange} name="firstName" placeholder="First Name"/>
          </label>
          <label className={styles.label}>
            <input className={styles.input} onChange={handleChange} name="email" placeholder="Email Address" />
          </label>
          <label className={styles.label}>
            <input className={styles.input} onChange={handleChange} name="password" type="password" placeholder="Password" />
          </label>
        </div>

        <div className={styles.column}>
          <label className={styles.label}>
            <input className={styles.input} onChange={handleChange} name="lastName" placeholder="Last Name" />
          </label>
          <label className={styles.label}>
            <input className={styles.input} onChange={handleChange} name="username" placeholder="Username" />
          </label>
          <label className={styles.label}>
            <input className={styles.input} onChange={handleChange} name="confirmPassword" type="password" placeholder="Confirm Password" />
          </label>
        </div>
      </div>
      
      <div className={styles.buttoncontainer}>
          <input onChange={handleChange} type="date" name="birthDate" />
          <button type="submit" className={styles.button}>Submit</button>
      </div>

    </form>

    </div>
    
    </>
  );
}