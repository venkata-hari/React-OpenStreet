import React, { createContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { CreateApi, GetUserById, DeleteApi, UpdateApi } from '../Utils/Api';
import { useNavigate } from 'react-router-dom';

export type ProfileData = {
    name: string;
    email: string;
    age: string | number | null;
};
type BooleanState = {
    name: boolean,
    email: boolean,
    age: boolean
}
export type ProfileData1 = {
    id:string | null,
    name: string;
    email: string;
    age: string | number | null;
};
type ProfileContextType = {
    profileData: ProfileData1 | null;
    loading: boolean;
    error: string | null;
    createProfile: (data: ProfileData) => void;
    UpdateProfile:(data:ProfileData)=>void;
    setDisplay: React.Dispatch<React.SetStateAction<boolean>>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setProfileData: React.Dispatch<React.SetStateAction<ProfileData1 | null>>;
    DeleteProfile: () => void
    display: boolean
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    message: ProfileData,
    setMessage:React.Dispatch<React.SetStateAction<ProfileData>>;
    value:BooleanState, 
    setValue:React.Dispatch<React.SetStateAction<BooleanState>>
    error1:ProfileData, 
    setError1:React.Dispatch<React.SetStateAction<ProfileData>>;
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const GobalState = ({ children }: { children: ReactNode }) => {
    const [profileData, setProfileData] = useState<ProfileData1 | null>(null);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [display, setDisplay] = useState(false)
    const [error1, setError1] = useState<ProfileData>({
        name: '',
        email: '',
        age: null
    });
    const [value, setValue] = useState<BooleanState>({
        name: false,
        email: false,
        age: false
    })
    const [message, setMessage] = useState<ProfileData>({
        name: '',
        email: '',
        age: ''
    })
    const navigate=useNavigate()
    const createProfile = useCallback(async (data: ProfileData) => {
        setLoading(true)
        const responsedata = await CreateApi(data);
        const env=process.env.REACT_APP_ENV==="DEV"?"DEV":"PRODUCTION"
        if (responsedata) {
            navigate('/profile')
            setLoading(false)
            setMessage({ name: 'Profile saved successfully!', email: '', age: '' });
            localStorage.setItem('env', env);
            localStorage.setItem('userid', responsedata.id);
            localStorage.setItem('profileData', JSON.stringify(responsedata));
            setLoading(false)
            setDisplay(true)
        }
        return responsedata;

    },[setProfileData, setLoading, setDisplay, navigate])
    const DeleteProfile = async () => {
        localStorage.removeItem("userid")
        await DeleteApi()
    }
    const UpdateProfile=useCallback(async(data: ProfileData)=>{
        setLoading(true)
        const responsedata=await UpdateApi(data)
        if (responsedata) {
            setProfileData(responsedata)
            setLoading(false)
            localStorage.setItem('userid', responsedata.id);
            localStorage.setItem('profileData', JSON.stringify(responsedata));
            navigate('/profile')
            setDisplay(true)
        }
        return responsedata;
    },[setProfileData, setLoading, setDisplay, navigate])
    const getDataFromAPI = useCallback(async () => {
        try {
            const apiData = await GetUserById();
            setProfileData(apiData);
        } catch (err) {
            setError('Failed to fetch data from API.');
        } finally {
            setLoading(false);
        }
    },[setProfileData])

    useEffect(() => {
        const storedProfileData = localStorage.getItem('profileData');
        if (storedProfileData) {
            setProfileData(JSON.parse(storedProfileData));
            setDisplay(true)
            setLoading(false);
        } else {
            setLoading(false);
            setDisplay(false)
            getDataFromAPI();
        }
    }, [display]);
    return (
        <ProfileContext.Provider value={{error1, setError1,value,setValue,message, setMessage, open, profileData, setOpen, loading,setLoading, error, display,UpdateProfile, createProfile, setDisplay, DeleteProfile, setProfileData }}>
            {children}
        </ProfileContext.Provider>
    );
};

export const useProfile = () => {
    const context = React.useContext(ProfileContext);
    if (!context) {
        throw new Error('useProfile must be used within a ProfileProvider');
    }
    return context;
};
