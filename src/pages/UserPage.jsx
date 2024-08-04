// import DateCalendarServerRequest from "../component/SmallCalendar";
import React from 'react';

import UserComponent from '../component/user/user';
import LoginForm from '../component/login-form/Loginform';

export default function UserPage() {
  return (
    <>
      <h1> 
        <UserComponent />
        <LoginForm/>
      </h1>
     
    </>
  );
}
