import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp() {

    // const { register, handlingSubmit } = useForm();


    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [formErrors, setFormErrors] = useState({
        emptyFirstName: false,
        emptyEmail: false,
        invalidEmail: false,
        emptyPassword: false,
        invalidPassword: false,
        notMatchingPassword: false,
    });

    const errorMessages = {
        emptyFirstNameError: "first name is required",
        emptyEmailError: "Email is required",
        invalidEmailError: "Email is invalalid",
        emptyPasswordError: "password is required",
        invalidPasswordError: "password must be at least 6 character",
        notMatchingPasswordError: "password is not matched",
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        // validateForm();
    };

    const validateForm = () => {
        const errors = {
            emptyFirstName: formData.firstName.trim() === '',
            emptyEmail: formData.email.trim() === '',
            invalidEmail: !/^\S+@\S+\.\S+$/.test(formData.email),
            emptyPassword: formData.password.trim() === '',
            invalidPassword: formData.password.length < 6,
            notMatchingPassword: formData.confirmPassword !== formData.password,
        };

        setFormErrors(errors);
        return !Object.values(errors).some(Boolean); // If any value in errors object is true, the form is invalid
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log('Form submitted successfully');
        } else {
            console.log('Form contains errors. Please check the fields.');
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Register
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    error={formErrors.emptyFirstName}
                                    autoComplete="given-name"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                    helperText={formErrors.emptyFirstName ? errorMessages.emptyFirstNameError : ''}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    error={formErrors.emptyEmail || formErrors.invalidEmail}
                                    helperText={formErrors.emptyEmail ? errorMessages.emptyEmailError : formErrors.invalidEmail ? errorMessages.invalidEmailError : ''}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    error={formErrors.emptyPassword || formErrors.invalidPassword}
                                    helperText={formErrors.emptyPassword ? errorMessages.emptyPasswordError : formErrors.invalidPassword ? errorMessages.invalidPasswordError : ''}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    type="password"
                                    id="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    error={formErrors.notMatchingPassword}
                                    helperText={formErrors.notMatchingPassword ? errorMessages.notMatchingPasswordError : ''}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Register
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="#" variant="body2">
                                    Already have an account? Login
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    );
}