import React, { Fragment, useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { Box, FormControl, TextField, Button, Alert, Grid } from '@mui/material';
import Loader from './Loader';
import './Styles/Auth.css';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState({ username: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setError((prev) => ({ ...prev, [name]: '' }));
        setFormData((prev) => ({ ...prev, [name]: value }));

        if (name === 'username' && value.length < 3) {
            setError((prev) => ({ ...prev, username: '*Minimum 3 characters required' }));
        }
        if (name === 'password' && value.length < 6) {
            setError((prev) => ({ ...prev, password: '*Password must be at least 6 characters' }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');

        if (!formData.username) {
            setError((prev) => ({ ...prev, username: '*Username is required' }));
            return;
        }
        if (!formData.password) {
            setError((prev) => ({ ...prev, password: '*Password is required' }));
            return;
        }
        if (error.username || error.password) return;

        setLoading(true);
        completeLogin();
    };

    const completeLogin = () => {
        setMessage('Login successful!');
        const userId = nanoid();
        localStorage.setItem('userid', userId);
        localStorage.setItem('username', formData.username);

        setTimeout(() => {
            setLoading(false);
            navigate('/dashboard');
            setFormData({ username: '', password: '' });
        }, 1000);
    };

    return (
        <Fragment>
            {loading && <Loader />}
            <Box className='root'>
                <Grid container spacing={8}>
                    <Grid item xs={12} md={12} lg={12} className="formContainer">
                        <FormControl className='form'>
                            <Box className='Profile_Management'>User Login</Box>
                            <Box sx={{ width: { lg: '80%', xs: '90%' } }}>
                                {message && (
                                    <Alert variant="filled" severity="success" sx={{ marginBottom: '3%' }}>
                                        {message}
                                    </Alert>
                                )}
                                <TextField
                                    type='text'
                                    error={Boolean(error.username)}
                                    size='small'
                                    label='Username'
                                    value={formData.username}
                                    name='username'
                                    className='inputfield'
                                    placeholder='Enter username'
                                    onChange={handleChange}
                                />
                                {error.username && <small className='alertmessage'>{error.username}</small>}

                                <TextField
                                    type='password'
                                    error={Boolean(error.password)}
                                    size='small'
                                    label='Password'
                                    value={formData.password}
                                    name='password'
                                    className='inputfield'
                                    placeholder='Enter password'
                                    onChange={handleChange}
                                />
                                {error.password && <small className='alertmessage'>{error.password}</small>}

                                <Button
                                    className='root'
                                    onClick={handleSubmit}
                                    disabled={loading}
                                    color='primary'
                                    variant='contained'
                                    sx={{
                                        fontFamily: '"Poppins", sans-serif',
                                        textTransform: 'capitalize',
                                        marginTop: '10%',
                                    }}
                                >
                                    Login
                                </Button>
                            </Box>
                        </FormControl>
                    </Grid>
                </Grid>
            </Box>
        </Fragment>
    );
}

export default Login;
