import { Margin } from '@mui/icons-material';
import { Avatar, Button, Checkbox, FormControl, FormControlLabel, FormLabel, Paper, Radio, RadioGroup, TextField, TextFieldProps, Typography, } from '@mui/material';
import Grid from '@mui/material/Grid2';
import AppRegistrationOutlinedIcon from '@mui/icons-material/AppRegistrationOutlined';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import React, { useState } from 'react';
import axios from 'axios';


function SignUP() {

    const [formData, setFormData] = useState({
        nid: '',
        name: '',
        dob: '',
        email: '',
        gender: '',
        username: '',
        password: '',
        confirmPassword: '',
        acceptTerms: false,
    });

    const paperStyle = {

        padding: '30px 20px', width: 300, margin: "20px auto"

    };

    const radioStyle = { '&.Mui-checked': { color: "#d5558b" } }

    // Update form data on input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };


    // Handle form submission

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Ensure password and confirm password match
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {

            // const response = await fetch('http://localhost:81/signup.php', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //         'Access-Control-Allow-Origin': 'http://127.0.0.1:5173',
            //         'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            //         'Access-Control-Allow-Headers': 'Content-Type'
            //     },
            //     body: JSON.stringify({
            //         name: formData.name,
            //         dob: formData.dob,
            //         email: formData.email,
            //         gender: formData.gender,
            //         username: formData.username,
            //         password: formData.password,

            //     }),
            // });
            // const result = await response.json();
            // if (result.status === 'success') {
            //     alert('User registered successfully');
            // } else {
            //     alert(result.message || 'Registration failed');
            // }

            const response = await axios.post('http://localhost:81/signup.php', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(response.data);

            if (response.data.status === 'success') {
                alert('User registered successfully');
            } else {
                alert(response.data.message || 'Registration failed');
            }




        } catch (error) {
            console.error('Error:', error)
            alert('An error occured');
        }

    };

    return (

        <Grid>
            <Paper elevation={20} style={paperStyle} >
                <Grid display='flex' flexDirection='column' alignItems='center' flexWrap='wrap' gap='5px'>
                    <Avatar style={{ backgroundColor: "#d5558b" }}><AppRegistrationOutlinedIcon /></Avatar>
                    <h2 style={{ margin: "0 0" }}>Sign Up</h2>
                    <Typography variant='caption'>Kindly complete this form to verify your identity.</Typography>
                </Grid>

                <form onSubmit={handleSubmit}>
                    <TextField label="NID" name='nid' value={formData.nid} onChange={handleChange} placeholder="Enter nid number" type="number" required fullWidth variant="standard" />
                    <TextField label="Name" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your name" type="text" required fullWidth variant="standard" />
                    <TextField label="Date of Birth" name="dob" value={formData.dob} onChange={handleChange} placeholder="" type="date" required fullWidth variant="standard" InputLabelProps={{ shrink: true }} sx={{ mt: 2 }} />
                    <TextField label="Email" name="email" value={formData.email} onChange={handleChange} placeholder="" type="email" required fullWidth variant="standard" />
                    <FormControl component="fieldset" sx={{ mt: 1 }} >
                        <FormLabel component="legend">Gender</FormLabel>
                        <RadioGroup aria-label="gender" name="gender" value={formData.gender} onChange={handleChange} style={{ display: 'initial' }}>
                            <FormControlLabel value="female" control={<Radio sx={radioStyle} />} label="Female" />
                            <FormControlLabel value="male" control={<Radio sx={radioStyle} />} label="Male" />
                            <FormControlLabel value="other" control={<Radio sx={radioStyle} />} label="Other" />
                        </RadioGroup>
                    </FormControl>
                    <TextField label="Username" name="username" value={formData.username} onChange={handleChange} placeholder="Set your username" required fullWidth variant="standard" />
                    <TextField label="Password" name="password" value={formData.password} onChange={handleChange} placeholder="Set password" type="password" required fullWidth variant="standard" />
                    <TextField label="Confirm Password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="" type="password" required fullWidth variant="standard" />
                    <FormControlLabel control={<Checkbox name="acceptTerms" checked={formData.acceptTerms} onChange={handleChange} sx={{ '&.Mui-checked': { color: "#d5558b" } }} />} label="I accept the terms and conditions" />

                    <Button type="submit" variant="contained" sx={{ backgroundColor: "#d5558b", margin: "20px 0" }} fullWidth>Sign Up</Button>



                </form>
            </Paper>
        </Grid>
    )

}

export default SignUP