import React,{useContext} from 'react';
import UserComponent from '../component/user/user';
import AuthContext from '../component/auth-context';

export default function UserPage() {
  const { isLoggedIn, firstName, logout } = useContext(AuthContext);
  return (
    <>
      <h1> 
        <UserComponent />
      </h1>
    </>
  );
}
