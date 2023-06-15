import React, { useContext } from 'react';
import { auth, GoogleProvider } from '../../firebase';
import { signInWithPopup } from 'firebase/auth';
import GoogleButton from 'react-google-button'

import UserContext from '../utils/userContext';

// Login with google component
const GoogleAuth = () => {
  const { setUser } = useContext(UserContext);

  const signInWithGoogle = async (e) => {
    e.preventDefault(); // Prevent the default action of the button

    try {
      const result = await signInWithPopup(auth, GoogleProvider);
      console.log('User signed in with Google:', result);
      setUser(result.user)
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '10px'}}>
      <GoogleButton type='light' style={{ borderRadius: '5px' }} onClick={(e) => signInWithGoogle(e)} />
    </div>
  );
};

export default GoogleAuth;
