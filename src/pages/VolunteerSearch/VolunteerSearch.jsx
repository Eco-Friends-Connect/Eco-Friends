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

  const events = [
    {
      title: 'Beach Cleanup',
      location: 'Santa Monica Beach',
      date: '2024-08-10',
      description: 'Join us for a beach cleanup!',
      imageUrl: 'https://example.com/image1.jpg'
    },
    {
      title: 'Park Restoration',
      location: 'Central Park',
      date: '2024-08-15',
      description: 'Help restore the park!',
      imageUrl: 'https://example.com/image2.jpg'
    },
   
  ];
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
      setError('Error fetching events, please try again later\n' + error);
    } finally {
      setLoading(false);
    }
    
  }

  useEffect(() =>{
    fetchEvents();
  },[]);

  const handleSignUp = (event) => {
    setSignedUpEvent(event.title);
  };

  return (
    <div>
      <h1 className={styles.anton}>Volunteer Opportunities</h1>
      <SearchBar />
      <EventList events={allEvents} onSignUp={handleSignUp} />
      {signedUpEvent && (
        <div style={{ marginTop: '20px', padding: '10px', border: '1px solid green', borderRadius: '5px', backgroundColor: '#e0f7fa' }}>
          <h2>Thank you for signing up!</h2>
          <p>You have signed up for: {signedUpEvent}</p>
        </div>
      )}
      {loading && (
        <PopOut isOpened={loading} popOutType="info" onClose={() => {}}>
          <p>Loading events...</p>
        </PopOut>
      )}
      {error && (
        <PopOut isOpened={error === null ? false : true} popOutType="error" onClose={() => {setError(null)}}>
          <p>{error}</p>
        </PopOut>
      )}
    </div>
  );
};

export default VolunteerSearch;
