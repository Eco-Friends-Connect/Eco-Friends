import styles from './footer.module.scss';
import { Link } from 'react-router-dom';
import React from 'react';
import treeLogo from '../../assets/tree_logo.png';


function Footer() {
    return (
      <div className={styles.container}>
      <footer className={styles.footer}>
          <Link className={styles.footer_a} to="/aboutthecreators">Creator Info</Link>
          <Link className={styles.footer_a} to="/sitesponsors">Site Sponsors</Link>
          <div className={styles.footer_logo}>
            <img src={treeLogo} alt="Tree Logo" />
          </div>
      </footer>
      </div>
    );
  }

export default Footer;