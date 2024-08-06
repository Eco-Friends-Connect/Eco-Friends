
import styles from './org-dashboard.module.scss';
import {React, useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import PopOut from '../../component/pop-out/pop-out';
import EcoButton from '../../component/eco-button/eco-button';
import EventForm from '../../component/event-form/event-form';
import EcoForm from '../../component/eco-form/eco-form';
import config from '../../config';


const signupFields = [
  {
    label: "First Name",
    type: "input",
    name: "firstName"
  },
  {
    label: "Last Name",
    type: "input",
    name: "lastName"
  },
  {
    label: "Email",
    type: "input",
    name: "email"
  },
  {
    label: "Date of Birth",
    type: "date",
    name: "dob"
  },
  {
    label: "Sign Date",
    type: "date",
    name: "signDate"
  },
  {
    label: "Is a user",
    type: "checkbox",
    name: "isUser"
  },{
    label: "Events",
    type: "select",
    name: "events",
    options: [""],//getEvents()["data"].map((event) => {return event.title;})
  }
];
const signupFormData = {
  firstName: "",
  lastName: "",
  email: "",
  dob: "",
  signDate: "",
  isUser: false,
  event: ""
};

function OrgDashboard() {
  const [eventFormOpened, setEventFormOpened] = useState(false);
  const [signupFormOpened, setSignupFormOpened] = useState(false);
  const navigate = useNavigate();
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
  // Navigation funcs
  const onClickBadges = () => {
    console.log("Badges clicked");
    navigate('/badges');
  };
  const onClickEvents = () => {
    console.log("Events clicked");
    navigate('/events');
  };

  return (
    <div>
        <div className={styles.navContainer}>
            <h2>Welcome </h2>
            <h1>Organization Dashboard</h1>
        </div>
        <div className={styles.container}>
            <div className={styles.colContainer}>
                <EcoButton onClick={onClickEvents} ecoButtonProps={{btnTitle: "Events", btnShape: "none", btnColor:"dark", animate:2}}/>
                <div className={styles.eventContainer}>
                    <EcoButton onClick={toggleEventFormOpened} ecoButtonProps={{btnTitle: "Create Event", btnShape: "triangle", btnColor:"light", animate: 1}}/>
                    <div className={styles.colContainer}>
                        <EcoButton ecoButtonProps={{btnTitle: "Check Signups", btnShape: "circle", btnColor:"yellow", animate: 2}}/>
                        <EcoButton onClick={toggleSignupFormOpened} ecoButtonProps={{btnTitle: "Create Signup", btnShape: "normal", btnColor:"light", animate: 1}}/>
                    </div>

                </div>
            </div>
            <div className={styles.colContainer}>
                <EcoButton onClick={onClickBadges} ecoButtonProps={{btnTitle: "Badges", btnShape: "circle", btnColor:"light", animate:2}}/>
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