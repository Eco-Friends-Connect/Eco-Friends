// import DateCalendarServerRequest from "../component/SmallCalendar";
import React from 'react';
import WelcomeLogout from '../component/welcome-logout/WelcomeLogout';
import { useAuth } from '../component/auth-context';

import UserComponent from '../component/user/user';
export default function UserPage() {
  const { isLoggedIn, username, logout } = useAuth();
  return (
    <>
      <h1> 
        <UserComponent />
      </h1>
     
      {isLoggedIn ? (
                <WelcomeLogout username={username} logout={logout} />
            ) : (
                <p></p>
            )}
    </>
  );
}
