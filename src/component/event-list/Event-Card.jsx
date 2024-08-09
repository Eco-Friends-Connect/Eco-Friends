import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Typography, Button, Avatar } from '@mui/material';
import styles from './EventCard.module.scss';
import EcoButton from '../eco-button/eco-button';

const EventCard = ({ event, onSignUp, buttonAvailable = true, buttonTitle, children }) => {
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
          {(event.location) ? `Location: ${event.location}` : ''}
        </Typography>
        <Typography variant="body1" component="p">
          {event.description}
        </Typography>
        {buttonAvailable &&(<Button variant="contained" color="primary" onClick={handleSignUp} style={{ marginTop: '16px' }}>
          {buttonTitle || 'Sign Up'}
        </Button>)}
        {event.imageUrl && (
          <Avatar
            src={event.imageUrl}
            alt={event.title}
            style={{ marginTop: '16px', width: '60px', height: '60px' }}
          />
        )}
        {children}
      </CardContent>
    </Card>
  );
};

EventCard.propTypes = {
  event: PropTypes.shape({
    title: PropTypes.string.isRequired,
    location: PropTypes.string,
    date: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
  }).isRequired,
  buttonAvailable: PropTypes.bool,
  buttonTitle: PropTypes.string,
  children: PropTypes.node,
  onSignUp: PropTypes.func.isRequired,
};

export default EventCard;
