import React,{useEffect,useState} from "react";

import styles from "./check-participant.module.scss";
import SearchBar from "../../component/search-bar/search_bar";
import EventCard from "../../component/event-list/Event-Card";
import config from "../../config";
import EcoButton from "../../component/eco-button/eco-button";
import PopOut from "../../component/pop-out/pop-out";

function CheckParticipant() {
    const [error, setError] = useState(null); // Add state for handling errors
    const [loading, setLoading] = useState(true);
    const [events, setEvents] = useState([]);
    const [participantsOpened, setParticipantsOpened] = useState(false);
    const [participants, setParticipants] = useState([]);

    // Use async/await for better readability

    async function getEvents() {
        setLoading(true);
        try{
            const response = await fetch(`${config.API_URL}/api/get/events`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log("incoming data",data.data);

            const formattedData = data.data.map(event => ({
                _id: event._id,
                deadline: event.deadline,
                title: event.title,
                location: event.location,
                date: new Date(event.deadline).toDateString(),
                description: event.description,
                imageUrl: event.imgUrl
            }));

            setEvents(formattedData);
        } catch (error) {
            console.error(error);
            setError('Failed to load events. Please try again later.');
        }
        finally {
            setLoading(false);
        }
    }
    async function getParticipants(eventId) {
        console.log("Getting participants for event",eventId);
        try{
            
            const response = await fetch(`${config.API_URL}/api/get/participants?eventId=${eventId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (!response.ok) {
                // setError('Failed to load participants. Please try again later.');
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log("incoming participant data",data.data);

            setParticipants(data.data);
        } catch (error) {
            console.error(error);
            setError('Failed to load participants. Please try again later.');
        }
    }
    async function onClickViewParticipants(eventId) {
        console.log("Viewing participants for event",eventId);
        getParticipants(eventId);
        setParticipantsOpened(true);
    }


    useEffect(() => {
        getEvents();
    }, []);

    function onSignUp(title) {
        console.log(title);

    }


    return (
        <>
            <h1>Check Participant</h1>
            {/* <SearchBar /> */}
            {loading && <p>Loading...</p>} {/* Display loading message */}
            {error && <p>{error}</p>} {/* Display error message */}
            <div className={styles.eventList}>
                {events.map((event) => (
                    <EventCard
                        key={event._id}
                        buttonAvailable={false}
                        event={event}
                        onSignUp={onSignUp}
                    >
                        <EcoButton onClick={()=>{onClickViewParticipants(event._id);}} ecoButtonProps={{btnTitle:"View Sign ups"}} />
                    </EventCard>
                ))}
            </div>
            {
                participantsOpened && 
                (<PopOut popOutType={"form"} isOpened={participantsOpened} onClose={()=>{setParticipantsOpened(false);}}>
                    <div>
                        <h1>Participants</h1>
                        {participants.length === 0 && <p>No participants found</p>}
                        {participants.length > 0 && 
                            <div className={styles.resultsDiv}>
                                {participants.map((participant, index) => (
                                    <EventCard key={index} 
                                    buttonAvailable={true} 
                                    buttonTitle={participant.status}
                                    event={{
                                        title:participant.firstName + ' '+participant.lastName ,
                                        date: new Date(participant.signupDate).toDateString(),
                                        description: participant.email,
                                    }}
                                    isButtonDisabled={true}
                                    onSignUp={() => {}} />
                                ))}
                            </div>
                        }
                    </div>
                </PopOut>)
            }
        </>
    );
}

export default CheckParticipant;