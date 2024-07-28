import { useNavigate } from 'react-router-dom';
import SelectOption from "../component/select-option/select-option";
import styles from '../component/select-option/select-option.module.scss';

const question = 'Are you a volunteer or an organization?';
const options = ['Volunteer', 'Organization'];

export default function UserOrOrgSelect() {
  const navigate = useNavigate();

  const handleOptionClick = (option) => {
    if (option === 'Volunteer') {
      navigate('/userpage'); 
    } else if (option === 'Organization') {
      navigate('/orglogin'); 
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <SelectOption 
          question={question} 
          options={options} 
          onOptionClick={handleOptionClick} 
        />
      </div>
    </div>
  );
}
