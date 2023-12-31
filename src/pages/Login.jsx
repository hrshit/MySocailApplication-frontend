import * as React from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import LoadingButton from '@mui/lab/LoadingButton';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { loginAction } from '../redux/actions/authActions';
import { authProps } from '../shared/prop-types/reducerProps';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" >
                FEED
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

function SignInSide({ auth, dispatch }) {

    console.log("Hello from login", auth);

    const navigate = useNavigate();
    if (auth.isLoggedIn)
        navigate('/');

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [formErrors, setFormErrors] = useState({
        emptyEmail: false,
        invalidEmail: false,
        emptyPassword: false,
        invalidPassword: false,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        const errors = {
            emptyEmail: formData.email.trim() === '',
            invalidEmail: !/^\S+@\S+\.\S+$/.test(formData.email),
            emptyPassword: formData.password.trim() === '',
            invalidPassword: formData.password.length < 6,
        };

        setFormErrors(errors);
        return !Object.values(errors).some(Boolean); // If any value in errors object is true, the form is invalid
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm()) {
            const loginBody = {
                email: formData.email,
                password: formData.password,
            }
            dispatch(loginAction(loginBody));
            console.log('Form submitted successfully');
        } else {
            console.log('Form contains errors. Please check the fields.');
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '85vh', width: '65vw', margin: '0rem auto' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Log in
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                value={formData.email}
                                onChange={handleChange}
                                error={formErrors.emptyEmail || formErrors.invalidEmail}
                                helperText={formErrors.emptyEmail ? 'Email is required' : formErrors.invalidEmail ? 'Invalid Email' : ''}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={formData.password}
                                onChange={handleChange}
                                error={formErrors.emptyPassword || formErrors.invalidPassword}
                                helperText={formErrors.emptyPassword ? 'Password is required' : formErrors.invalidPassword ? 'Password must be at least 6 characters' : ''}
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            {(auth.errorMessage.code === 401) &&
                                <Alert variant="filled" severity="error">
                                    {auth.errorMessage.message}
                                </Alert>}
                            <LoadingButton
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                size="large"
                                loading={auth.isFetching}
                                loadingPosition="end"
                            >
                                <span>Login</span>
                            </LoadingButton>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="/register" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                            <Copyright sx={{ mt: 5 }} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

SignInSide.propTypes = {
    auth: authProps.isRequired,
};

export default connect((state) => ({
    auth: state.auth,
}))(SignInSide);