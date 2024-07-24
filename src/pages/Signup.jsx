//import { useNavigate } from 'react-router-dom';
import Signup from '../component/signup-form/Signup';
import DateCalendarServerRequest from './SmallCalendar';


function SignupFormPage() {
 // const navigate = useNavigate();

  //const handleSignupClick = () => {
    //navigate('/signup');
  //};

  return (

    <>
    
      <h2>Home Page</h2>
      <Signup />
      <DateCalendarServerRequest />

    </>
       
    

  );
}

export default SignupFormPage;