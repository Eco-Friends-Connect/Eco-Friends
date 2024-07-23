//import { useNavigate } from 'react-router-dom';
import Signup from './Signup';
import DateCalendarServerRequest from './SmallCalendar';
import styles from './SignupPage.module.scss';

function SignupFormPage() {
 // const navigate = useNavigate();

  //const handleSignupClick = () => {
    //navigate('/signup');
  //};

  return (
    <div className={styles.page}>
    <div >
      <h2>Home Page</h2>
      <Signup />
      <DateCalendarServerRequest />
       
    </div>
    </div>
  );
}

export default SignupFormPage;