import React from 'react';
import styles from './Signup.module.scss';

export default function SignupForm() {
  return (
    <form className={styles.form}>
      <h1 className={styles.signup}>Sign Up</h1>
      <div className={styles.container}>
        <div className={styles.column}>
          <label className={styles.label}>
            <input className={styles.input} name="firstName" placeholder="First Name" />
          </label>
          <label className={styles.label}>
            <input className={styles.input} name="email" placeholder="Email Address" />
          </label>
          <label className={styles.label}>
            <input className={styles.input} name="password" type="password" placeholder="Password" />
          </label>
        </div>
        <div className={styles.column}>
          <label className={styles.label}>
            <input className={styles.input} name="lastName" placeholder="Last Name" />
          </label>
          <label className={styles.label}>
            <input className={styles.input} name="username" placeholder="Username" />
          </label>
          <label className={styles.label}>
            <input className={styles.input} name="Re-enter Password" type="password" placeholder="Confirm Password" />
          </label>
        </div>
      </div>
      
      <div className={styles.buttoncontainer}>

        <input type="date" name="Birthdate" defaultValue="Birthdate" />
        <div className={styles.paddiv}></div>
     
        <button type="submit" className={styles.button}>Submit</button>
      </div>
    </form>
  );
}