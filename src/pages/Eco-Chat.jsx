import React from 'react';
import EcoLogoutButton from '../component/eco-button/eco-button-logout'

import { useAuth } from '../component/auth-context';


export default function EcoChat(){
    const { isLoggedIn, username, logout } = useAuth();
    return(
        <div>
         {isLoggedIn ? (
        <div>
          <p>Welcome, {username}!</p>
          <EcoLogoutButton/>
        </div>
      ) : (
        <p></p>
      )}
        
        <h1>
            Chat here!
        </h1>
        
       
    </div>
 

        
        
       
    );
}