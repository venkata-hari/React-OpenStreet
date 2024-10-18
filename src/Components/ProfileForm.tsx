import React, { Fragment, useEffect, useState } from 'react'
import './Styles/ProfileForm.css'
import { nanoid } from 'nanoid'
import { useProfile } from '../ContextApi/GobalState'
import { Button, Box, FormControl, InputLabel, TextField, Alert, Grid } from '@mui/material'
import Loader from './Loader'
type IState = {
    name: string;
    email: string;
    age: null | number | string
}

function ProfileForm() {
    const {error1,setError1,value,setValue,message,setMessage, createProfile,profileData,UpdateProfile,loading} = useProfile()
    const userid = localStorage.getItem('userid');
    const profiledata = localStorage.getItem('profileData');
    const [formData, setFormData] = useState<IState>({
        name: (userid || profiledata || (profileData && profileData.name)) ? profileData?.name || "" : "",
        email: (userid || profiledata || (profileData && profileData.email)) ? profileData?.email || "" : "",
        age: (userid || profiledata || (profileData && profileData.age)) ? profileData?.age || null : null
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        if (name === 'name') {
            setMessage((prev) => ({ ...prev, name: '' }))
            if (value.length < 3) {
                setError1((prev) => ({ ...prev, name: '*Minimum of 3 characters' }))
                setValue((prev) => ({ ...prev, name: true }))
                
            }
            else {
                setError1((prev) => ({ ...prev, name: '' }))
                setValue((prev) => ({ ...prev, name: false }))
                
            }
        }
        if (name === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            setMessage((prev) => ({ ...prev, email: '' }))
            if (!emailRegex.test(value)) {
                setError1((prev) => ({ ...prev, email: '*Must be in a valid email format' }))
                setValue((prev) => ({ ...prev, email: true }))        
            }
            else {
                setError1((prev) => ({ ...prev, email: '' }))
                setValue((prev) => ({ ...prev, email: false }))
            }
        }
        if (name === 'age') {
            const ageValue = parseInt(value, 10);
            if (ageValue <= 8) {
                setError1((prev) => ({ ...prev, age: '*Age must be above 8 years' }))
                setValue((prev) => ({ ...prev, age: true }))
               
                
            }
            else {
                setError1((prev) => ({ ...prev, age: '' }))
                setValue((prev) => ({ ...prev, age: false }))
                
            }
        }
        setFormData((prev) => ({ ...prev, [name]: value } as any))
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage({ name: '', email: '', age: '' });
        if (!formData.name) {
            setMessage((prev) => ({ ...prev, name: 'name is required' }));
            setError1((prev) => ({ ...prev, name: '' }))
            setValue((prev) => ({ ...prev, name: true }))
            
            return;
        } else if (!formData.email) {
            setMessage((prev) => ({ ...prev, email: 'email is required' }));
            setValue((prev) => ({ ...prev, email: true }))
            setError1((prev) => ({ ...prev, email: '' }))
            
            return;
        }

        const data = {
            id: nanoid(),
            name: formData.name,
            email: formData.email,
            age: formData.age,
        };
        createProfile(data)
        setFormData({ name: '', email: '', age: null });

    };
    const handleUpdate = () => {
        const data = {
            name: formData.name,
            email: formData.email,
            age: formData.age,
        };
        UpdateProfile(data)
    }
    const isFormComplete=()=>{
        if(error1.name==="" && error1.email===""  ){
         return true
        }
        else{
            return false
        }
    }
    const btn_text = (userid|| profiledata) ?
        <Button className='root' onClick={handleUpdate} disabled={value.age || loading || !isFormComplete()} color='success' variant='contained' 
        sx={{fontFamily:'"Poppins", sans-serif',textTransform:'capitalize',marginTop:'10%'}}>
            Update Profile
        </Button> :
        <Button className='root' onClick={handleSubmit} disabled={value.age || loading || !isFormComplete()} color='primary' variant='contained' 
        sx={{fontFamily:'"Poppins", sans-serif',textTransform:'capitalize',marginTop:'10%'}}>
            Create Profile
        </Button>
    return (
        <Fragment>
          {loading&&<Loader/>}
            <Box className='root'>
                <Grid container spacing={8}>
                  
                    <Grid item xs={12} md={12} lg={12} className="formContainer">
                        <FormControl className='form'>
                          <Box className='Profile_Management'>Profile Management Application</Box>
                          <Box sx={{width:{lg:'80%',xs:'90%'}}}>
                            {(message.name || message.email || message.age) && (
                                <Alert variant="filled" severity={message.name === "Profile saved successfully!" ? "success" : "error"} sx={{marginBottom:'3%'}}>
                                    {message.name || message.email || message.age}
                                </Alert>
                            )}
                            <TextField type='text' error={value.name} size='small' label='Name' value={formData.name} name='name' className='inputfield' placeholder='Enter name' onChange={handleChange} />
                            {error1.name && <small className='alertmessage'>{error1.name}</small>}
                            <TextField type='email' error={value.email} size='small' label='email' value={formData.email} name='email' className='inputfield' placeholder='Enter email' onChange={handleChange} />
                            {error1.email && <small className='alertmessage'>{error1.email}</small>}
                            <TextField type='number' error={value.age} size='small' label='age' value={formData.age !== null ? formData.age : ''} name='age' className='inputfield' placeholder='Enter age' onChange={handleChange} />
                            {error1.age && <small className='alertmessage'>{error1.age}</small>}
                            {btn_text}
                            </Box>
                        </FormControl>
                    </Grid>
                </Grid>
            </Box>
        </Fragment>
    )
}
export default ProfileForm


