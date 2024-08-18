import React, { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './navbar.module.scss';
import WelcomeLogout from '../welcome-logout/WelcomeLogout';
import AuthContext from '../auth-context';

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, firstName, logout } = useContext(AuthContext);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const isOrgDashboard = location.pathname === '/org-dashboard';
  const shouldDisplayWelcomeLogout = isLoggedIn;

  return (
    <nav className={styles.nav}>
      <div className={styles.hamburgerMenu} onClick={toggleMenu}>
        <div className={styles.line}></div>
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
        {shouldDisplayWelcomeLogout && (
          <li className={styles.a}>
            <WelcomeLogout
              className={styles.a}
              firstName={isOrgDashboard ? '' : firstName}  // Hide firstName on org-dashboard
              hideWelcome={isOrgDashboard}  // Hide welcome message on org-dashboard
              logout={logout}
            />
          </li>
        )}
      </ul>
    </nav>
  );
}
