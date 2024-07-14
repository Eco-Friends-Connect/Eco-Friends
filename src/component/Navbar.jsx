import React from 'react';
import { Link } from 'react-router-dom';
import styles from './navbar.module.css';

export default function NavBar() {
  return (
    <nav className={styles.nav}>
        <ul className={styles.ul}>
            <li className={styles.li}><Link className={styles.a} to="/home">Home</Link></li>
            <li className={styles.li}><Link className={styles.a} to="/about">About</Link></li>
            <li className={styles.li}><Link className={styles.a} to="/volunteersearch">Volunteer Search</Link></li>
            <li className={styles.li}><Link className={styles.a} to="/orglogin">Organization Login</Link></li>
            <li className={styles.li}><Link className={styles.a} to="/leaderboard">Leader Board</Link></li>
            <li className={styles.li}><Link className={styles.a} to="/userpage">User Page</Link></li>
            <li className={styles.li}><Link className={styles.a} to="/ecochat">Eco Chat</Link></li>
            <li className={styles.li}><Link className={styles.a} to="/aboutthecreators">About The Creators</Link></li>
        </ul>
    </nav>
  );
}
