
import styles from './org-dashboard.module.scss';
import {React, useState, useEffect} from 'react';
import PopOut from '../../component/pop-out/pop-out';
import EcoButton from '../../component/eco-button/eco-button';
import EventForm from '../../component/event-form/event-form';
import EcoForm from '../../component/eco-form/eco-form';
import config from '../../config';


const signupFields = [
  {
    label: "Account ID",
    type: "input",
    name: "accountId"
  },
  {
    label: "Event ID",
    type: "input",
    name: "eventId"
  },
  {
    label: "Signup Date",
    type: "date",
    name: "signupDate"
  },
  {
    label: "Status",
    type: "input",
    name: "status"
  }
];
const signupFormData = {
  accountId: "",
  eventId: "",
  signupDate: "",
  status: ""
};

function OrgDashboard() {
  const [eventFormOpened, setEventFormOpened] = useState(false);
  const [signupFormOpened, setSignupFormOpened] = useState(false);
  
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
  
  async function createSignup(formData) {
    console.log("Handling create signup");
    console.log(formData);
  }
  function toggleEventFormOpened() {
    setEventFormOpened(!eventFormOpened);
  }
  function toggleSignupFormOpened() {
    setSignupFormOpened(!signupFormOpened);
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
                        <EcoButton onClick={toggleSignupFormOpened} ecoButtonProps={{btnTitle: "Create Signup", btnShape: "normal", btnColor:"light", animate: 1}}/>
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
                <PopOut isOpened={true} isForm={true} onClose={() => {toggleEventFormOpened();}}>
                    <EventForm onSubmit={createEvent}/>
                </PopOut>
            )
        }
        {
            signupFormOpened && (
                <PopOut isOpened={true} isForm={true} onClose={() => {toggleSignupFormOpened();}}>
                    <EcoForm title="Volunteer Sign up" fields={signupFields} formData={signupFormData} onSubmit={createSignup} submitTitle={'Request'} />
                </PopOut>
            )
        }
    </div>
  );
}

export default OrgDashboard;