import styles from './footer.module.scss';
import { Link } from 'react-router-dom';
import React from 'react';


function Footer() {
    return (
  
      <footer className={styles.footer}>
          <Link className={styles.footer_a} to="/aboutthecreators">Creator Info</Link>
          <Link className={styles.footer_a} to="/sitesponsors">Site Sponsors</Link>
          <div className={styles.footer_logo}>
            <img src="src\assets\tree_logo.png" alt="Tree Logo" />
          </div>
          
      </footer>
    );
  }

export default Footer;