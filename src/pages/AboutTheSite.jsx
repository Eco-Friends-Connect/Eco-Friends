import { AboutPage } from '../component/about-the-site-text.jsx'; 
import styles from '../component/AboutTheSiteText.module.scss'



export default function About(){
    return(
        <div className={styles.sectionContainer}>
            <AboutPage />
        </div>


    );
}