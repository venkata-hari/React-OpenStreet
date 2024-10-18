import { toast } from 'react-toastify';
import { ProfileData } from '../ContextApi/GobalState'
const BaseURL:any =process.env.REACT_APP_ENV==="DEV"?process.env.REACT_APP_API_URL:process.env.REACT_APP_API_URL;
export const CreateApi = async (data: ProfileData) => {
    try {
        const res = await fetch(BaseURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        const responsedata = await res.json();
        toast.success('User Created Successfully');
        return responsedata;
    } catch (err) {
     
        toast.error('Failed to create user');
    }
};

export const GetUserById = async () => {
    try {
        const id = localStorage.getItem("userid");
        const res = await fetch(`${BaseURL}/${id}`);
        const responsedata = await res.json();
        return responsedata;
    } catch (err) {
        toast.error('Failed to fetch user');
    }
};

export const UpdateApi = async (data: ProfileData) => {
    try {
        const id = localStorage.getItem("userid");
        const res = await fetch(`${BaseURL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        const responsedata = await res.json();
        toast.success('User updated successfully!');
        return responsedata;
    } catch (err) {
        
        toast.error('Failed to update user');
    }
};

export const DeleteApi = async () => {
    try {
        const id = localStorage.getItem("userid");
        await fetch(`${BaseURL}/${id}`, {
            method: 'DELETE',
        });
        toast.success('User deleted from the Api');
    } catch (err) {
        toast.error('Failed to delete user');
    }
};
