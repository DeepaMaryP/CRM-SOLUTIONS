import axios from "axios";

const BASE_API_URL = "http://localhost:3000/api/user"

export const createUser = async (user) => {
    try {        
        const response = await axios.post(BASE_API_URL, user);
        return response.data
    } catch (error) {      
        console.log({ error });      
        return (error.response?.data?.message?.includes('duplicate key error') ? "Email Id exists.Please select a different one"
                : (error.data?.message || 'Failed to Create User')  )          
    }
}
