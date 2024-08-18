import React,{useContext} from 'react';
import UserComponent from '../component/user/user';
import NavBar from '../component/navbar/Navbar';
import AuthContext from '../component/auth-context';


export default function UserPage() {
  
  return (
    <>
      <NavBar />
      <UserComponent />
      {/* <Lottie animationData={groovyWalkAnimation} loop={true} /> */}
    </>
  );
}
