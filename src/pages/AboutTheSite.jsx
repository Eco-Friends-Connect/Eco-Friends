import styles from '../component/description/AboutTheSiteText.module.scss';
import { AboutPage } from '../component/description/about-the-site-text'; 


export default function About(){
    return(
        <div className={styles.sectionContainer}>
            <AboutPage />
        </div>


    );
}