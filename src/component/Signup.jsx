import React from 'react';
import styles from './Signup.module.scss';

export default function SignupForm() {
  return (
    <>
      <form className={styles.form}>
        <h1>Sign Up</h1>
        <label className={styles.label}>
          <input name="firstName" placeholder="First Name" />
        </label>
        <label className={styles.label}>
          <input name="lastName" placeholder="Last Name" />
        </label>
        <br />
        <label className={styles.label}>
          <input name="email" placeholder="Email Address" />
        </label>
        <label className={styles.label}>
          <input name="username" placeholder="Username" />
        </label>
        <br />
        <label className={styles.label}>
          <input name="password" type="password" placeholder="Password" />
        </label>
        <label className={styles.label}>
          <input name="Re-enter Password" type="password" placeholder="Confirm Password" />
        </label>
        <br />
        <label className={styles.label}>
          <input type="date" name="Birthdate" defaultValue="Birthdate" />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
