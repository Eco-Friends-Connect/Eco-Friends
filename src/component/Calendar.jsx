import { Calendar, momentLocalizer } from 'react-big-calendar';
// import  { useState } from 'react';
import moment from 'moment';
import React from 'react';

import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

// SAMPLE events with entry examples

const EcoCalendar= () => {
    /*const [events, setEvents] = useState([
      {
        title: 'Meeting',
        start: new Date(2024, 6, 20, 10, 0), // July 20, 2024, 10:00 AM
        end: new Date(2024, 6, 20, 12, 0), // July 20, 2024, 12:00 PM
      },
      {
        title: 'Lunch',
        start: new Date(2024, 6, 21, 12, 0), // July 21, 2024, 12:00 PM
        end: new Date(2024, 6, 21, 13, 0), // July 21, 2024, 1:00 PM
      },
    ]);
    */
  
    return (
      <div style={{ height: '500px' }}>
        <Calendar
          localizer={localizer}
          //events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
        />
      </div>
    );
  };
  
  export default EcoCalendar;