import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import styles from './navbar.module.scss';
import WelcomeLogout from '../welcome-logout/WelcomeLogout';
import AuthContext from '../auth-context';

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const { isLoggedIn, firstName, logout } = useContext(AuthContext);

  return (
    <nav className={styles.nav}>
      <div className={styles.hamburgerMenu} onClick={toggleMenu}>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
      </div>
      <ul className={`${styles.ul} ${isOpen ? styles.active : ''}`}>
        <li className={styles.li}>
          <Link className={styles.a} to="/home">Home</Link>
        </li>
        <li className={styles.li}>
          <Link className={styles.a} to="/about">About</Link>
        </li>
        <li className={styles.li}>
          <Link className={styles.a} to="/volunteersearch">Volunteer Search</Link>
        </li>
        <li className={styles.li}>
          <Link className={styles.a} to="/aboutthecreators">About The Creators</Link>
        </li>
        {isLoggedIn && (
          <li className={styles.a}>
            <WelcomeLogout  className={styles.a} firstName={firstName} logout={logout} />
          </li>
        )}
      </ul>
    </nav>
  );
}
