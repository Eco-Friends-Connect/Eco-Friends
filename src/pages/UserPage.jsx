// import DateCalendarServerRequest from "../component/SmallCalendar";
import React from 'react';
import UserComponent from '../component/user/user';
import HiddenButtons from '../component/hidden-buttons/HiddenButtons';

export default function UserPage() {
  return (
    <>
      <h1>
        <UserComponent />
      </h1>
     <HiddenButtons />
      
    </>
  );
}
