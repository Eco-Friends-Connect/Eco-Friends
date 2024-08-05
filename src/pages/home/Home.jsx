import { useNavigate } from 'react-router-dom';
import styles from './Home.module.scss';
import treeImage from '../../assets/tree.jpg';
import React from 'react';



function Home() {
  const navigate = useNavigate();

  const handleSignupClick = () => {
    navigate('/signup');
  };
  
  

  return ( 
    <div>
      <h1>Eco-Friends Connect</h1>
      <div className={styles.treeimg}>
      <img src={treeImage}  alt="Tree"></img>
      <h1 className={styles.anton}> To Better the Environment <br></br></h1> 
      <h1 className={styles.anton}>and Connect People</h1>
      </div>
      <div className={styles.buttoncontainer}>
        
          <button className={styles.signupButton} onClick={handleSignupClick}>
            Sign up for help
        </button>
      
      <button className={styles.calendarButton}>Calendar</button>
      <button className={styles.howItWorksButton}>How it works</button>
      </div>
    </div>
  );
}

export default Home;