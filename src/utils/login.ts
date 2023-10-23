import Cookies from 'js-cookie';
import { axiosInstance } from './instance';
import React, { SetStateAction } from 'react';

export const login = async (
  email: string, 
  password: string, 
  setIsLoading: React.Dispatch<SetStateAction<boolean>>
) => {

  try {
    setIsLoading(true);  // Set loading to true when starting to try to login
    
    const response = await axiosInstance.post('/login', {
      email,
      password,
    });
    
    if (response && response.data && response.data.token) {
      console.log(response)
      Cookies.set('key', response.data.token);
      // Authentication successful
      window.location.reload();

      setIsLoading(false);  // Reset loading when login is successful
      return response.data;
    } else {
      // Authentication failed
      console.error('auth failed')
      setIsLoading(false);  // Reset loading when login fails
      return null;
    }
  } catch (error) {
   
    console.error(error);
    setIsLoading(false);  // Ensure loading is reset even on error
    return null;
  }
};

