/*

import React, { useState } from 'react';
import SearchBar from '../search-bar/search_bar';
import EventList from '../search-result/search-result';
import { Typography } from '@mui/material';

const initialEvents = [
  {
    title: 'Community Clean-Up',
    date: '2024-08-10',
    description: 'Join us for a community clean-up event to help keep our neighborhood clean and green!',
  },
  {
    title: 'Tree Planting',
    date: '2024-08-15',
    description: 'Help us plant trees in the local park. All tools and supplies will be provided.',
  },
  // Add more events as needed
];

export default function VolunteerSearch() {
  const [events, setEvents] = useState(initialEvents);
  const [filteredEvents, setFilteredEvents] = useState(initialEvents);

  const handleSearch = (query) => {
    const result = events.filter(event => 
      event.title.toLowerCase().includes(query.toLowerCase()) ||
      event.description.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredEvents(result);
  };

  return (
    <>
      <h1>Event Lists</h1>
      <div style={{ padding: '32px' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Upcoming Events
        </Typography>
        <EventList events={filteredEvents} />
      </div>
      <SearchBar  />
    </>
  );
}

*/