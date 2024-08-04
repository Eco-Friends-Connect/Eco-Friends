import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Typography, Button, Avatar } from '@mui/material';
import styles from './EventCard.module.scss';

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

export default EventCard;
