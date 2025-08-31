import axios from "axios";

const BASE_API_URL = "http://localhost:3000/api/role"

export const fetchRoles = async () => {
    try {
        const response = await axios.get(BASE_API_URL)
        return response.data.allRoles
    } catch (error) {
        console.log({ error });
        return error.response?.data?.message || "Failed to fetch roles";
    }
}

export async function getRoles() {
    try {
        const allRoles = await fetchRoles()        
        const roles = allRoles.map(role =>
            ({ value: role._id, label: role.name })
        )        
        return roles;
    } catch (error) {
        console.log({ error });
        return error.response?.data?.message || "Failed to fetch roles";
    }   
}