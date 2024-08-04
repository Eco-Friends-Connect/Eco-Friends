import React, { useState } from 'react';
import EventList from '../component/event-list/Event-List'
import SearchBar from '../component/search-bar/search_bar'



const VolunteerSearch = () => {
  const [signedUpEvent, setSignedUpEvent] = useState(null);

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

  const handleSignUp = (title) => {
    setSignedUpEvent(title);
  };

  return (
    <div>
      <h1>Volunteer Opportunities</h1>
      <SearchBar />
      <EventList events={events} onSignUp={handleSignUp} />
      {signedUpEvent && (
        <div style={{ marginTop: '20px', padding: '10px', border: '1px solid green', borderRadius: '5px', backgroundColor: '#e0f7fa' }}>
          <h2>Thank you for signing up!</h2>
          <p>You have signed up for: {signedUpEvent}</p>
        </div>
      )}
    </div>
  );
};

export default VolunteerSearch;
