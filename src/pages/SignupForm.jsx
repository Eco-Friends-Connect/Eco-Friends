
//import { useNavigate } from 'react-router-dom';
import Signup from '../component/signup-form/Signup';
import DateCalendarServerRequest from '../component/SmallCalendar';
import styles from '../component/signup-form/Signup.module.scss';
import config from '../config';

const signupUser = async (formData) => {
  const API_URL = config.API_URL;
  console.log("User signed up");
  console.log("form Here", formData);
  fetch(`${API_URL}/api/post/create-user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
  .then((response) => response.json())
  .catch((error) => {
    console.error('Error:', error);
  });

};

function SignupFormPage() {

  return (
    
    <div className={styles.page}>
      
      <Signup onSubmit={signupUser} />
      <div className={styles.calendar}>
        <DateCalendarServerRequest></DateCalendarServerRequest>
      </div>
      
    </div>
  );
}

export default SignupFormPage;
