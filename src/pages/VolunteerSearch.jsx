import React from 'react';
import EventList from '../component/event-list/Event-List'

const VolunteerSearch = () => {
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
    // Add more events as needed
  ];

  const handleSignUp = (title) => {
    console.log(`Signed up for: ${title}`);
  };

  return (
    <div>
      <h1>Volunteer Opportunities</h1>
      <EventList events={events} onSignUp={handleSignUp} />
    </div>
  );
};

export default VolunteerSearch;
