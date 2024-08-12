import React from 'react';
import EcoButton from './eco-button';
import config from '../../config';
import { useAuth } from '../../component/auth-context';


const EcoLogoutButton= () => {
    const { isLoggedIn, firstname, logout } = useAuth();
  const handleLogout = async () => {
    const API_URL = config.API_URL;
    try {
      const response = await fetch(`${API_URL}/api/post/logout`, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log('Logout successful');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div>
      <EcoButton 
        ecoButtonProps={{
          btnShape: 'circle',
          btnColor: 'yellow',
          animate: 1,
          btnTitle: 'Logout',
          btnSize: 'small',
          btnFontSize: 'large',
        }} 
        onClick={logout}
      />
    </div>
  );
};

export default EcoLogoutButton ;
