import styles from './footer.module.scss';
import { Link } from 'react-router-dom';


export default function Footer() {
    return (
  
      <footer className={styles.footer}>
          <a href=""><Link className={styles.footer_a} to="/aboutthecreators">Creator Info</Link></a>
          <a href=""><Link className={styles.footer_a} to="/sitesponsors">Site Sponsors</Link></a>
          <div className={styles.footer_logo}>
            <img src="src\assets\tree_logo.png" alt="Tree Logo" />
          </div>
          
      </footer>
    );
  }