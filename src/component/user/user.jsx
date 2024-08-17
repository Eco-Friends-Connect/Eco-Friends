import { useNavigate } from 'react-router-dom';
import styles from './user.module.scss';
// import DateCalendarServerRequest from '../SmallCalendar';
import React from 'react';
import {DotLottieReact}  from '@lottiefiles/dotlottie-react'; 
import Grid from '@mui/material/Grid';


function UserComponent() {
  const navigate = useNavigate();

  const handleConnectTree = () => {
    navigate('/VolunteerSearch');
  };

  const handleChatTree = () => {
    navigate('/ecochat');
  };

  const handleBadgePage = () => {
    navigate('/');
  };
  const backgroundStyle = {
    overflow: 'hidden',
  };
  const groovyWalkLottieLink = "https://lottie.host/d63ccc42-2e3b-4108-911c-efbd694e2fc8/p5N7YFFSGG.json";
  return (
    <>

      <div className={styles.background}>
        <div className={styles.buttonContainer}>
          <div className={styles.ConnectTree} onClick={handleConnectTree}></div>
          <DotLottieReact className={styles.groovyWalk} src={groovyWalkLottieLink} loop={true} autoplay={true} />
          <div className={styles.buttonColContainer}>
            <div className={styles.Badges} onClick={handleBadgePage}></div>
            <div className={styles.ChatTree} onClick={handleChatTree}></div>
          </div>
        </div>
      </div>

      {/* <div className={styles.calendar}><DateCalendarServerRequest /></div> */}
    </>
  );
}

export default UserComponent;


