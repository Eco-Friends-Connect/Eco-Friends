
import styles from './org-dashboard.module.scss';
import {React, useState, useEffect} from 'react';
import PopOut from '../../component/pop-out/pop-out';
import EcoButton from '../../component/eco-button/eco-button';
import EventForm from '../../component/event-form/event-form';
import config from '../../config';

function OrgDashboard() {
  const [eventFormOpened, setEventFormOpened] = useState(false);
  
  async function createEvent(formData) {
    console.log("Handling create event");
    console.log(formData);
    const response = await fetch(`${config.API_URL}/api/post/create-event`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    console.log("Result",data);
  }
  function toggleEventFormOpened() {
    setEventFormOpened(!eventFormOpened);
  }
  useEffect(() => {
    console.log("Event form opened: ", eventFormOpened);
  }, [eventFormOpened]);

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
                    <EcoButton onClick={toggleEventFormOpened} ecoButtonProps={{btnTitle: "Create Event", btnShape: "triangle", btnColor:"light", animate: 1}}/>
                    <div className={styles.colContainer}>
                        <EcoButton ecoButtonProps={{btnTitle: "Check Signups", btnShape: "circle", btnColor:"yellow", animate: 2}}/>
                        <EcoButton ecoButtonProps={{btnTitle: "Create Signup", btnShape: "normal", btnColor:"light", animate: 1}}/>
                    </div>

                </div>
            </div>
            <div className={styles.colContainer}>
                <EcoButton ecoButtonProps={{btnTitle: "Badges", btnShape: "circle", btnColor:"light", animate:2}}/>
                <EcoButton ecoButtonProps={{btnTitle: "Create Badge", btnShape: "hexagon", btnColor:"dark", animate: 1}}/>
            </div>
        </div>
        {
            eventFormOpened && (
                <PopOut isOpened={true} onClose={() => {toggleEventFormOpened();}}>
                    <EventForm onSubmit={createEvent}/>
                </PopOut>
            )
        }
    </div>
  );
}

export default OrgDashboard;