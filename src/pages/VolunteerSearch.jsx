import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SearchBar from "../component/search-bar/search_bar";
import { Card, CardContent, Typography, Button, Grid, Avatar } from '@mui/material';
import styles from "./VolunteerSearch.module.scss";

// Example events array replace with data from database when connecting
const events = [
  {
    title: 'Community Clean-Up',
    location: 'Easter Lake Park',
    date: '2024-08-10',
    description: 'Join us for a community clean-up event to help keep our neighborhood clean and green!',
    imageUrl: 'https://via.placeholder.com/150', // Example image URL
  },
  {
    title: 'Tree Planting',
    location: 'Easter Lake Park',
    date: '2024-08-15',
    description: 'Help us plant trees in the local park. All tools and supplies will be provided.',
    imageUrl: 'https://via.placeholder.com/150', // Example image URL
  },
];

const EventCard = ({ event, onSignUp }) => {
  const handleSignUp = () => {
    onSignUp(event.title);
  };

  return (
    <Card className={styles.Card}>
      <CardContent>
        <Typography variant="h5" component="div">
          {event.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {event.date}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Location: {event.location}
        </Typography>
        <Typography variant="body1" component="p">
          {event.description}
        </Typography>
        <Button variant="contained" color="primary" onClick={handleSignUp} style={{ marginTop: '16px' }}>
          Sign Up
        </Button>
        {event.imageUrl && (
          <Avatar
            src={event.imageUrl}
            alt={event.title}
            style={{ marginTop: '16px', width: '60px', height: '60px' }}
          />
        )}
      </CardContent>
    </Card>
  );
};

EventCard.propTypes = {
  event: PropTypes.shape({
    title: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
  }).isRequired,
  onSignUp: PropTypes.func.isRequired,
};

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

export default function VolunteerSearch() {
  const [signupMessage, setSignupMessage] = useState('');

  const handleSignUp = (eventTitle) => {
    setSignupMessage(`You have signed up for ${eventTitle}`);
  };

  return (
    <>
      <h1>Event Lists</h1>
      <SearchBar />
      <div className={styles.Div}>
        <Typography variant="h4" component="h1" gutterBottom>
          Upcoming Events
        </Typography>
        <EventList events={events} onSignUp={handleSignUp} />
        {signupMessage && (
          <Typography variant="h6" component="p" className={styles.Typography}>
            {signupMessage}
          </Typography>
        )}
      </div>
    </>
  );
}
