import { axiosInstance } from './instance';

export const authregister = async (email:string, password:string,fullname:string) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks

    try {
        const response = await axiosInstance.post('/register', {
            email,
            password,
            username:fullname,
        });
    
        if (response && response.data && response.data.token) {
            // Authentication successful
           
            return response.data;
        } else {
            // Authentication failed
           
            return response;
        }
        } catch (error) {
            
        console.error(error);
        return null;
        }
    };

