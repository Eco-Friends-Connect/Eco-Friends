import { useNavigate } from 'react-router-dom';
import styles from './Home.module.scss';
import treeImage from '../../assets/tree.jpg';
import React, {useContext} from 'react';
import AuthContext from '../../component/auth-context';
import WelcomeLogout from '../../component/welcome-logout/WelcomeLogout';



  

function Home() {
  const navigate = useNavigate();

  const handleSignupClick = () => {
    navigate('/signup');
  };

  const handleCalandarClick = () => {
    navigate('/userpage');
  };

  const handleHowItWorksClick = () => {
    navigate('/about');
  };

  const { isLoggedIn, firstName, logout } = useContext(AuthContext);
      
  return (
    <div className={styles.container}>
      <header>
        <h1>Eco-Friends Connect</h1>
      </header>
      <section className={styles.treeimg}>
        <img src={treeImage}  alt="Tree"></img>
      </section>
      <section className={styles.phrase}>
        <h1 className={styles.anton}>To Better the Enviroment <br></br></h1> 
        <h1 className={styles.anton}>and Connect People</h1>
      </section>
      <section className={styles.button}>
          <button className={styles.signupButton} onClick={handleSignupClick}><p className={styles.center}>Eco-friends</p ></button>
      <button className={styles.calendarButton} onClick={handleCalandarClick}>Calendar</button>
      <button className={styles.howItWorksButton} onClick={handleHowItWorksClick}>How it works</button>
      </section>
   
    </div>
  );
}

export default Home;