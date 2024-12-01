import React, { useState } from 'react';
import { Paper, Avatar, TextField, FormControlLabel, Checkbox, Stack, Typography, Button, Link } from "@mui/material";
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import Grid from '@mui/material/Grid';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const paperStyle = {
        paddingTop: 40,
        padding: 30,
        height: '70vh',
        width: 300,
    };

    const avatarStyle = { backgroundColor: "#d5558b" };

    const handleLogin = async () => {
        setErrorMessage(''); // Clear previous errors
        try {
            const response = await fetch('http://localhost:81/login.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const result = await response.json();

            if (result.success) {
                alert("Login successful");
                navigate('/dashboard'); // Redirect to a dashboard or other page
            } else {
                setErrorMessage(result.message);
            }
        } catch (error) {
            setErrorMessage("An error occurred. Please try again.");
        }
    };

    return (
        <Stack direction="row" spacing={2} style={{ justifyContent: 'center' }}>
            <Grid container sx={{ width: '100%', height: '100%', justifyContent: "center", paddingTop: 10 }}>
                <Paper elevation={10} style={paperStyle}>
                    <Grid display='flex' flexDirection='column' alignItems='center' gap='5px'>
                        <Avatar style={avatarStyle}><HowToVoteIcon /></Avatar>
                        <Typography variant="h5" component="h2">Sign In</Typography>
                    </Grid>

                    <TextField
                        label="Username"
                        placeholder="Enter username"
                        required
                        fullWidth
                        variant="standard"
                        sx={{ marginBottom: 2 }}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        label="Password"
                        placeholder="Enter password"
                        type="password"
                        required
                        fullWidth
                        variant="standard"
                        sx={{ marginBottom: 2 }}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <FormControlLabel control={<Checkbox sx={{ '&.Mui-checked': { color: "#d5558b" } }} />} label="Remember Me" />

                    <Button
                        variant="contained"
                        sx={{ backgroundColor: "#d5558b", margin: "10px 0" }}
                        fullWidth
                        onClick={handleLogin}
                    >
                        Sign In
                    </Button>

                    {errorMessage && <Typography color="error" sx={{ marginTop: 1 }}>{errorMessage}</Typography>}

                    <Typography sx={{ margin: "3px 0" }}>
                        <Link href="#" color="inherit" variant="body2">Forgot Password?</Link>
                    </Typography>

                    <Typography variant="body2">
                        Are you registered?
                        <Link component={RouterLink} to="/signup" color="inherit" sx={{ ml: 1, textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
                            Register
                        </Link>
                    </Typography>
                </Paper>
            </Grid>
        </Stack>
    );
}

export default Login;
