import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './user.module.scss';
import DateCalendarServerRequest from '../SmallCalendar';

function clickableButtons() {
  const navigate = useNavigate();

  const handleConnectTree = () => {
    navigate('/VolunteerSearch');
  };

  const handleChatTree = () => {
    navigate('/ecochat');
  };

  const handlebadgepage = () => {
    navigate('/');
  };
  return (
    <div className={styles.background}>
      <div className={styles.ConnectTree} onClick={handleConnectTree}></div>
      <div className={styles.ChatTree} onClick={handleChatTree}></div>
      <div className={styles.Badges} onClick={handlebadgepage}></div>
      <div className={styles.calendar}>
        <DateCalendarServerRequest />
      </div>
      
    </div>
    
  );
}

export default clickableButtons;

