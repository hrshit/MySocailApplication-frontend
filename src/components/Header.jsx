import React from 'react';
import './Header.css';
import { AppBar, Toolbar, Stack, Box } from '@mui/material'
import Typography from '@mui/material/Typography';
import { authProps } from '../shared/prop-types/reducerProps';
import { useNavigate, Link, Outlet } from 'react-router-dom';
import { connect } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import SyncIcon from '@mui/icons-material/Sync';
import LogoutIcon from '@mui/icons-material/Logout';
import { logoutAction } from '../redux/actions/authActions';

const Header = ({ auth, dispatch }) => {

    const navigate = useNavigate();


    const handleLogout = () => {
        const logOutReqBody = {
            refreshToken: auth.tokens.refresh.token
        }
        dispatch(logoutAction(logOutReqBody));
        navigate('/login');
    }

    const handleProfile = () => {
        console.log("profile uploading");
        navigate('/profile');
    }

    return (
        <>
            <AppBar position='static' >
                <Toolbar >
                    <Link to='/'>Home</Link>

                    <Box sx={{ flexGrow: 1 }} />
                    <Stack direction='row' spacing={2}  >
                        {!(auth.isLoggedIn) &&
                            <>

                                <Link to='/register'>Register</Link>
                                <Link to='/login'>Login</Link>

                            </>
                        }
                        {
                            (auth.isLoggedIn) &&
                            <>
                                <Typography variant="h6" component="div" sx={{ p: 1, }}>
                                    Welcome {auth.loggedInUser.name}
                                </Typography>
                                <Link to="/profile">
                                    <IconButton
                                        size="large"
                                        aria-label="account of current user"
                                        aria-controls="menu-appbar"
                                        aria-haspopup="true"
                                        // onClick={handleProfile}
                                        color="inherit"
                                    >
                                        <AccountCircle />
                                    </IconButton>
                                </Link>
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleLogout}
                                    color="inherit"
                                >
                                    {(auth.isFetching) ? <SyncIcon /> : <LogoutIcon />}
                                </IconButton>
                            </>
                        }
                    </Stack >
                </Toolbar >
            </AppBar >
            <div id='detail'>
                <Outlet />
            </div>
        </>
    );
};

Header.propTypes = {
    auth: authProps.isRequired,
};

export default connect((state) => ({
    auth: state.auth,
}))(Header);
