import { useNavigate } from 'react-router-dom';
import styles from './user.module.scss';
import DateCalendarServerRequest from '../SmallCalendar';
import React from 'react';

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

  return (
    <div className={styles.background}>
      <div className={styles.ConnectTree} onClick={handleConnectTree}></div>
      <div className={styles.ChatTree} onClick={handleChatTree}></div>
      <div className={styles.Badges} onClick={handleBadgePage}></div>
      <div className={styles.calendar}>
        <DateCalendarServerRequest />
      </div>
    </div>
  );
}

export default ClickableButtons;


