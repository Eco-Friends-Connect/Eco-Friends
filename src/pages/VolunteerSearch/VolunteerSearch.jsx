import React, { useState,useEffect } from 'react';
import EventList from '../../component/event-list/Event-List';
import SearchBar from '../../component/search-bar/search_bar';
import styles from './VolunteerSearch.module.scss';
import config from '../../config';
import PopOut from '../../component/pop-out/pop-out';


const VolunteerSearch = () => {
  const [signedUpEvent, setSignedUpEvent] = useState(null);
  const [allEvents, setAllEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [outputMessage, setOutputMessage] = useState(null);

  
  async function fetchEvents() {
    setLoading(true);
    try {
      const requestOptions = {
        method: 'GET',
        redirect: 'follow',
      };
      const fetchUrl = `${config.API_URL}/api/get/all-events`;
      
      const response = await fetch(fetchUrl, requestOptions).then((response) => response.json());
      console.log('response', response);
      let data = response.data;
      data.forEach((element) => {
        element.date = new Date(element.createdAt).toLocaleDateString();
        element.location = "TBD";
      });
      setAllEvents(data);
    } catch (error) {
      console.error('Error fetching events', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
    
  }

  async function signUpForEvent(event) {
    if(!event) {
      setError('No event selected');
      return;
    }
    setLoading(true);
  
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ eventId: event._id, status: 'pending' }),
    };
  
    const fetchUrl = `${config.API_URL}/api/post/create-signup`;
  
    try {
      console.log('fetchUrl', fetchUrl);
      const response = await fetch(fetchUrl, requestOptions);
  
      // Check if response is okay and handle it accordingly
      if (!response.ok) {
        // Handle specific error status codes
        if (response.status === 400) {
          const responseText = await response.json();
          setError(responseText.message);
        } else {
          setError('An error occurred. Please try again.');
        }
        // Optionally, handle other status codes or parse response
        return;
      }
  
      // Parse and handle JSON response
      const data = await response.json();
      console.log('response data', data);
      setOutputMessage(data.message);
      setSignedUpEvent(event.title);
  
    } catch (error) {
      // Handle fetch errors
      console.error('Error signing up for event', error);
      setError(error.message);
  
    } finally {
      // Always executed regardless of success or failure
      setLoading(false);
    }
  }

  useEffect(() =>{
    fetchEvents();
  },[]);

  async function onClickSignUp (event)  {
    // setSignedUpEvent(event);
    console.log('Signing up for', event);
    signUpForEvent(event);
  }

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.anton}>Volunteer Opportunities</h1>
        <SearchBar />
        <EventList buttonsTitle={"☝️ Click Sign up"} events={allEvents} onSignUp={onClickSignUp} />
        {signedUpEvent && (
          <div style={{ marginTop: '20px', padding: '10px', border: '1px solid green', borderRadius: '5px', backgroundColor: '#e0f7fa' }}>
            <h2>Thank you for signing up!</h2>
            <p>You have signed up for: {signedUpEvent}</p>
          </div>
        )}
      </div>
      {loading && (
        <PopOut isOpened={loading} popOutType="info" onClose={() => {}}>
          <p>Loading events...</p>
        </PopOut>
      )}
      {(error !== null) && (
        <PopOut isOpened={error !== null ? true : false} popOutType="error" onClose={() => {setError(null);}}>
          <p>{error}</p>
        </PopOut>
      )}
      {(outputMessage !== null) && (
        <PopOut isOpened={outputMessage !== null ? true : false} popOutType="success" onClose={() => {setOutputMessage(null);}}>
          <p>{outputMessage}</p>
        </PopOut>
      )}
    </>
  );
};

export default VolunteerSearch;
