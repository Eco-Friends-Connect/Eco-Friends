
//import { useNavigate } from 'react-router-dom';
import Signup from '../component/signup-form/Signup';
import DateCalendarServerRequest from './SmallCalendar';
import styles from '../component/signup-form/Signup.module.scss';

function SignupFormPage() {
  //const navigate = useNavigate();

  /*const handleSignupClick = () => {
    navigate('/signup');
  };
  */

  return (
    
    <div className={styles.page}>
      
      <Signup />
      <div className={styles.calendar}>
        <DateCalendarServerRequest></DateCalendarServerRequest>
      </div>
      
    </div>
  );
}

export default SignupFormPage;
