import styles from '../component/description/AboutTheSiteText.module.scss';
import AboutPage  from '../component/description/about-the-site-text'; 
import React from 'react';


export default function About(){
    return(
        <div className={styles.sectionContainer}>
            <AboutPage />
        </div>


    );
}