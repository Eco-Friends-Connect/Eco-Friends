import React,{useContext} from 'react';
import UserComponent from '../component/user/user';
import AuthContext from '../component/auth-context';
import Lottie from 'lottie-react';
import groovyWalkAnimation from '../assets/lotties/groovyWalk.json';


export default function UserPage() {
  const { isLoggedIn, firstName, logout } = useContext(AuthContext);
  return (
    <>
      <UserComponent />
      {/* <Lottie animationData={groovyWalkAnimation} loop={true} /> */}
    </>
  );
}
