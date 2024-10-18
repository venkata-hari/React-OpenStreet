import React, { useMemo } from 'react';
import { useProfile } from '../ContextApi/GobalState';
import { Box, Alert, Typography,Card } from '@mui/material';
import Loader from './Loader';
import { Button } from '@mui/material';
import Popup from './Popup';
import { useNavigate } from 'react-router-dom';
import CardData from './Cards/CardData'
import './Styles/ProfileForm.css';
import NoProfileCard from './Cards/NoProfileCard';
function Profile() {
    const { profileData, loading, error,display} = useProfile();
    const profileContent = useMemo(() => {
        return (
            <div>
                <CardData/>
            </div>
        );
    }, [profileData, display]);
    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <Alert severity="error">{error}</Alert>;
    }


    return (
        <Box className="root">
            <Popup />
            {profileData?.id ? (
                profileContent 
            ) : (
                <Box>
                    <NoProfileCard value={true}/> 
                </Box>
            )}
        </Box>
    );
}

export default Profile;
