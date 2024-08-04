import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import EventCard from './Event-Card.jsx';

const EventList = ({ events, onSignUp }) => {
  return (
    <Grid container spacing={2}>
      {events.map((event, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <EventCard event={event} onSignUp={onSignUp} />
        </Grid>
      ))}
    </Grid>
  );
};

EventList.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      imageUrl: PropTypes.string,
    }).isRequired
  ).isRequired,
  onSignUp: PropTypes.func.isRequired,
};

export default EventList;
