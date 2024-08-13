import React,{useContext} from 'react';
import WelcomeLogout from '../component/welcome-logout/WelcomeLogout';
import UserComponent from '../component/user/user';
import AuthContext from '../component/auth-context';

export default function UserPage() {
  const { isLoggedIn, firstName, logout } = useContext(AuthContext);
  return (
    <>
      <h1> 
        <UserComponent />
      </h1>
     
      {isLoggedIn ? (
                <WelcomeLogout firstName={firstName} logout={logout} />
            ) : (
                <p></p>
            )}
    </>
  );
}
