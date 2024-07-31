
import EcoButton from '../../component/eco-button/eco-button';
import styles from './org-dashboard.module.scss';
import React from 'react';

function OrgDashboard() {

  return (
    <div>
        <div className={styles.navContainer}>
            <h2>Welcome </h2>
            <h1>Organization Dashboard</h1>
        </div>
        <div className={styles.container}>
            <div className={styles.colContainer}>
                <EcoButton ecoButtonProps={{btnTitle: "Events", btnShape: "none", btnColor:"dark", animate:2}}/>
                <div className={styles.eventContainer}>

                    <EcoButton ecoButtonProps={{btnTitle: "Create Event", btnShape: "triangle", btnColor:"light", animate: 1}}/>
                    <EcoButton ecoButtonProps={{btnTitle: "Check Signups", btnShape: "circle", btnColor:"yellow", animate: 2}}/>
                </div>
            </div>
            <div className={styles.colContainer}>
                <EcoButton ecoButtonProps={{btnTitle: "Badges", btnShape: "circle", btnColor:"light", animate:2}}/>
                <EcoButton ecoButtonProps={{btnTitle: "Create Badge", btnShape: "hexagon", btnColor:"dark", animate: 1}}/>
            </div>
        </div>

    </div>
  );
}

export default OrgDashboard;