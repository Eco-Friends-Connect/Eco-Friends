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
          <button className={styles.signupButton} onClick={handleSignupClick}><p className={styles.center}>Sign up for help</p ></button>
      <button className={styles.calendarButton}>Calendar</button>
      <button className={styles.howItWorksButton}>How it works</button>
      </section>
      {isLoggedIn ? (
                <WelcomeLogout firstName={firstName} logout={logout} />
            ) : (
                <p></p>
            )}
    </div>
  );
}

export default Home;