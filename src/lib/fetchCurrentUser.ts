import { GetCurrentUser } from '@/actions/getUser';
import { UserSchema } from '@/types';
import axios from 'axios';

export const fetchCurrentUser = async () =>{
    try {
        const { data } = await GetCurrentUser();
    return UserSchema.parse(data);

    } catch (error) {
        // Optionally handle the error, e.g., logging or sending it to an error tracking service
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || 'Error fetching current user');
        }
        throw error; // Re-throw non-Axios errors
    }
};

;
