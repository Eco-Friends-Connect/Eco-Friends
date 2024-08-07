
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

const badgeFormData = {
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
    if(response.status === 200) {
        setOutputMessage(data.message ? data.message : "Event created successfully");
    } else {
        setErrorMessage(data.message ? data.message : "Error creating event");
    }
    console.log("Result",data);
  }
  
  async function createSignup(formData) {
    console.log("Handling create signup");
    console.log(formData);

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
    if(response.status === 200) {
        setOutputMessage(data.message ? data.message : "Badge created successfully");
    } else {
        setErrorMessage(data.message ? data.message : "Error creating badge");
    }
    console.log("Result",data);
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
    console.log("Event form opened: ", eventFormOpened);
  }, [eventFormOpened]);
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
            <PopOut isOpened={true} popOutType={"success"} onClose={() => {setOutputMessage(null);}}>
              <div>{outputMessage}</div>
              </PopOut>
            )
        }
    </div>
  );
}

export default OrgDashboard;