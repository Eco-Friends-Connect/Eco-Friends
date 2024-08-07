import { useNavigate } from 'react-router-dom';
import SelectOption from "../../component/select-option/select-option";
import PopOut from '../../component/pop-out/pop-out';
import EcoForm from '../../component/eco-form/eco-form';
import styles from './UserOrOrgPage.module.scss';
import config from '../../config';
import React from 'react';

const question = 'Are you a volunteer or an organization?';
const options = ['Volunteer', 'Org'];
const orgFields = [
  {
    label: 'Organization Name',
    name: 'name',
    type: 'text',
  },
  {
    label: 'Organization Description',
    name: 'description',
    type: 'text',
  },
  {
    label: 'Address',
    name: 'address',
    type: 'text',
  },
  {
    label: 'City',
    name: 'city',
    type: 'text',
  },
  {
    label: 'State',
    name: 'state',
    type: 'text',
  },
  {
    label: 'Zip Code',
    name: 'zipCode',
    type: 'text',
  },
];

const orgFormData = {
  orgName: '',
  orgDescription: '',
  orgAddress: '',

};

export default function UserOrOrgSelect() {
  const navigate = useNavigate();
  const [isCreatingOrg, setIsCreatingOrg] = React.useState(false);
  
  const handleOptionClick = (option) => {
    if (option === 'Volunteer') {
      navigate('/userpage'); 
    } else if (option === 'Org') {
      // navigate('/org-dashboard'); 
      console.log(isCreatingOrg);
      toggleCreatingOrg();
    }
  };
  const toggleCreatingOrg = () => {
    setIsCreatingOrg(!isCreatingOrg);
  };
  const onSubmitOrgForm = (formData) => {
    console.log(formData);
    fetch(`${config.API_URL}/api/post/create-org`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Create org failed');
      }
    })
    .then((orgCreated) => {
      console.log('Org created', orgCreated);
      navigate('/org-dashboard'); 
    })
    .catch((error) => {
      console.error('Error:', error);
    });
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
      {isCreatingOrg && (
          <div>
            <PopOut title='Create Organization' isOpened={true} popOutType={"form"} onClose={()=>{toggleCreatingOrg();}}>
              <EcoForm title='Create Organization' fields={orgFields} formData={orgFormData} onSubmit={onSubmitOrgForm} submitTitle="Create" />
            </PopOut>
          </div>
        )
      }
    </div>
  );
}
