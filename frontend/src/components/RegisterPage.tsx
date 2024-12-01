import { Box, Typography, TextField, Button, Divider } from "@mui/material";

function RegisterPage() {

    return (
        <Box className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600">
            <Box className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
                <Typography variant="h4" align="center" gutterBottom className="font-bold text-indigo-700">
                    Register
                </Typography>
                {/* {error && <Typography color="error" align="center" gutterBottom>{error}</Typography>} */}

                <form className="space-y-4">
                    <TextField
                        label="Name"
                        variant="outlined"
                        fullWidth
                    />
                    <TextField
                        label="Email"
                        variant="outlined"
                        type="email"
                        fullWidth
                    />
                    <TextField
                        label="Password"
                        variant="outlined"
                        type="password"
                        fullWidth
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Register
                    </Button>
                </form>

                <Divider className="my-4">or</Divider>

                <Button
                    variant="outlined"
                    color="secondary"
                    fullWidth
                >
                    Register with Google
                </Button>
            </Box>
        </Box>
    );

}

export default RegisterPage;