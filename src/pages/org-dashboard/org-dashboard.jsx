
import styles from './org-dashboard.module.scss';
import {React, useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import PopOut from '../../component/pop-out/pop-out';
import EcoButton from '../../component/eco-button/eco-button';
import EventForm from '../../component/event-form/event-form';
import EcoForm from '../../component/eco-form/eco-form';
import config from '../../config';
import { set } from 'mongoose';
import CheckParticipant from '../check-participant/check-participant';


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
    name: "birthDate"
  },
  {
    label: "Sign Date",
    type: "date",
    name: "signDate"
  },
  {
    label: "Available Events",
    type: "select",
    name: "eventId",
    options: [""],
  }
];
let signupFormData = {
  firstName: "",
  lastName: "",
  email: "",
  birthDate: "",
  signDate: "",
  eventId: signupFields[5].options[0],
};
const badgeFields = [
  {
    label: "Title",
    type: "input",
    name: "title"
  },
  {
    label: "Description",
    type: "input",
    name: "description"
  },
  {
    label: "Criteria",
    type: "input",
    name: "criteria"
  },
];

let badgeFormData = {
    title: "",
    description: "",
    criteria: ""
};

function OrgDashboard() {
  const [eventFormOpened, setEventFormOpened] = useState(false);
  const [signupFormOpened, setSignupFormOpened] = useState(false);
  const [badgeFormOpened, setBadgeFormOpened] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [outputMessage, setOutputMessage] = useState(null);
  const [events, setEvents] = useState([]);

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
    if(response.status === 201) {
        setOutputMessage(data.message ? data.message : "Event created successfully");
    } else {
        setErrorMessage(data.message ? data.message : "Error creating event");
    }
    console.log("Result",data);
  }
  
  async function createSignup(formData) {
    console.log("Handling create signup");
    // swap the event title in formData with the event id
    const event = events.find((event) => event.title === formData.eventId);
    formData.eventId = event._id;
    console.log(formData);
    const response = await fetch(`${config.API_URL}/api/post/create-volunteer-request`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    if(response.status === 201) {
        setOutputMessage(data.message ? data.message : "Signup created successfully");
    } else {
        setErrorMessage(data.message ? data.message : "Error creating signup");
    }
    console.log("Result",data);
  }
  async function createBadge(formData) {
    console.log("Handling create badge");
    console.log(formData);
    const response = await fetch(`${config.API_URL}/api/post/create-badge`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData), 
    });
    const data = await response.json();
    if(response.status === 201) {
        setOutputMessage(data.message ? data.message : "Badge created successfully");
    } else {
        setErrorMessage(data.message ? data.message : "Error creating badge");
    }
    console.log("Result",data);
  }
  async function getEvents() {
    try {
      const response = await fetch(`${config.API_URL}/api/get/events`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log("getEvents", data);
      if(response.status === 200) {
        setEvents(data["data"]);
        return data;
      } else {
        setErrorMessage(data.message ? data.message : "Error getting events");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to load events. Please try again later.");
    }
  }


  function toggleBadgeFormOpened() {
    setBadgeFormOpened(!badgeFormOpened);
  }
  function toggleEventFormOpened() {
    setEventFormOpened(!eventFormOpened);
  }
  function toggleSignupFormOpened() {
    setSignupFormOpened(!signupFormOpened);
  }
  useEffect(() => {
    getEvents().then((data) => {
      console.log("Events", data);
      signupFields[5].options = data["data"].map((event) => {return event.title;});
    });
  }, []);
  // onClick funcs
  const onClickBadges = () => {
    console.log("Badges clicked");
    navigate('/badges');
  };
  const onClickEvents = () => {
    console.log("Events clicked");
    navigate('/events');
  };
  const onClickCreateBadge = () => {
    console.log("Create Badge clicked");
    setBadgeFormOpened(true);
  };
  const onClickCheckParticipant = () => {
    console.log("Check Participant clicked");
    navigate('/check-participant');
  };

  return (
    <div>
        <div className={styles.navContainer}>
            <h2>Welcome </h2>
            <h1 className={styles.anton}>Organization Dashboard</h1>
        </div>
        <div className={styles.container}>
            <div className={styles.colContainer}>
                <EcoButton onClick={onClickEvents} ecoButtonProps={{btnTitle: "Events", btnShape: "none", btnColor:"dark", animate:2}}/>
                <div className={styles.eventContainer}>
                    <EcoButton onClick={toggleEventFormOpened} ecoButtonProps={{btnTitle: "Create Event", btnShape: "triangle", btnColor:"light", animate: 1}}/>
                    <div className={styles.colContainer}>
                        <EcoButton onClick={onClickCheckParticipant} ecoButtonProps={{btnTitle: "Check Signups", btnShape: "circle", btnColor:"yellow", animate: 2}}/>
                        <EcoButton onClick={toggleSignupFormOpened} ecoButtonProps={{btnTitle: "Create Signup", btnShape: "normal", btnColor:"light", animate: 1}}/>
                    </div>

                </div>
            </div>
            <div className={styles.colContainer}>
                <EcoButton onClick={onClickBadges} ecoButtonProps={{btnTitle: "Badges", btnShape: "circle", btnColor:"light", animate:2}}/>
                <EcoButton onClick={onClickCreateBadge} ecoButtonProps={{btnTitle: "Create Badge", btnShape: "hexagon", btnColor:"dark", animate: 1}}/>
            </div>
        </div>
        {
            eventFormOpened && (
                <PopOut isOpened={true} popOutType={"form"} onClose={() => {toggleEventFormOpened();}}>
                    <EventForm onSubmit={createEvent}/>
                </PopOut>
            )
        }
        {
            signupFormOpened && (
                <PopOut isOpened={true} popOutType={"form"} onClose={() => {toggleSignupFormOpened();}}>
                    <EcoForm title="Volunteer Sign up" fields={signupFields} formData={signupFormData} onSubmit={createSignup} submitTitle={'Request'} />
                </PopOut>
            )
        }
        {
            badgeFormOpened && (
              <PopOut isOpened={true} popOutType={"form"} onClose={() => {toggleBadgeFormOpened();}}>
                    <EcoForm title="Create Badge" fields={badgeFields} formData={badgeFormData} onSubmit={createBadge} submitTitle={'Create'} />
                </PopOut>
            )
        }
        {
          errorMessage !== null && (
            <PopOut isOpened={true} popOutType={"error"} onClose={() => {setErrorMessage(null);}}>
              <div>{errorMessage}</div>
              </PopOut>
            )
        }
        {
          outputMessage !== null && errorMessage === null && (
            <PopOut isOpened={true} popOutType={'success'} onClose={() => {setOutputMessage(null);}}>
              <div>{outputMessage}</div>
            </PopOut>
            )
        }
    </div>
  );
}

export default OrgDashboard;