import { useNavigate } from 'react-router-dom';
import styles from './user.module.scss';
// import DateCalendarServerRequest from '../SmallCalendar';
import React from 'react';
import Lottie from 'lottie-react';
import groovyWalkAnimation from '../../assets/lotties/groovyWalk.json';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';

function ClickableButtons() {
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

  return (
    <>
    
          <div className={styles.background}>

      <Lottie className={styles.groovyWalk} animationData={groovyWalkAnimation} loop={true} />
      <div className={styles.ConnectTree} onClick={handleConnectTree}></div>
      <div className={styles.ChatTree} onClick={handleChatTree}></div>
      <div className={styles.Badges} onClick={handleBadgePage}></div>
          </div>
=
      {/* <div className={styles.calendar}><DateCalendarServerRequest /></div> */}
    </>
  );
}

export default ClickableButtons;


