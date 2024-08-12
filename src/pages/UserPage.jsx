// import DateCalendarServerRequest from "../component/SmallCalendar";
import React from 'react';
import WelcomeLogout from '../component/welcome-logout/WelcomeLogout';
import { useAuth } from '../component/auth-content-creation';
import UserComponent from '../component/user/user';

export default function UserPage() {
  const { isLoggedIn, firstname, logout } = useAuth();
  return (
    <>
      <h1> 
        <UserComponent />
      </h1>
     
      {isLoggedIn ? (
                <WelcomeLogout firstname={firstname} logout={logout} />
            ) : (
                <p></p>
            )}
    </>
  );
}
