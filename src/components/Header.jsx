import React from 'react';
import './Header.css';
import { AppBar, Toolbar, Stack, Box } from '@mui/material'
import Typography from '@mui/material/Typography';
import { authProps, notificationProps } from '../shared/prop-types/reducerProps';
import { useNavigate, Link, Outlet } from 'react-router-dom';
import { connect } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SyncIcon from '@mui/icons-material/Sync';
import LogoutIcon from '@mui/icons-material/Logout';
import PendingIcon from '@mui/icons-material/Pending';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { logoutAction } from '../redux/actions/authActions';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getNotificationAction } from '../redux/actions/notificationActions';
import { formatDistanceToNow } from 'date-fns'


const defaultTheme = createTheme();

const Header = ({ auth, notifications, dispatch }) => {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        getNotification();
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const navigate = useNavigate();


    const handleLogout = () => {
        const logOutReqBody = {
            refreshToken: auth.tokens.refresh.token
        }
        dispatch(logoutAction(logOutReqBody));
        navigate('/login');
    }

    const getNotification = async () => {
        let params = '';
        params = params + "?receiver=" + auth.loggedInUser.id;
        params = params + "&sortBy=postedAt:desc";
        await dispatch(getNotificationAction(params, auth.tokens.access.token));
    };

    const timediffrence = (createdDateString) => {
        const createdDate = new Date(createdDateString);
        const formattedTimeDifference = formatDistanceToNow(createdDate, { addSuffix: true });
        return formattedTimeDifference;
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Box sx={{ width: '100vw' }}>
                <AppBar position='static' sx={{ margin: 0 }} >
                    <Toolbar >
                        <Link
                            className='link' to='/'
                        >
                            <img
                                src="feed.png"
                                alt=""
                                className='logo'
                            />
                        </Link>
                        <Box sx={{ flexGrow: 1 }} />
                        <Stack direction='row' spacing={2}  >
                            {
                                !(auth.isLoggedIn) &&
                                <>
                                    <Link className='link' to='/register'>Register</Link>
                                    <Link className='link' to='/login'>Login</Link>
                                </>
                            }
                            {
                                (auth.isLoggedIn) &&
                                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                    <Box>
                                        <Typography
                                            variant="h6"
                                            component="div"
                                            sx={{
                                                p: { xs: 1, md: 1 },
                                                fontWeight: { xs: 10, md: 500 }
                                            }}
                                        >
                                            Welcome {auth.loggedInUser.name}
                                        </Typography>
                                    </Box>
                                    <Link to="/profile">
                                        <IconButton
                                            size="large"
                                            aria-label="account of current user"
                                            aria-controls="menu-appbar"
                                            aria-haspopup="true"
                                            color="Blue"
                                        >
                                            <AccountCircle />
                                        </IconButton>
                                    </Link>
                                    <IconButton
                                        size="large"
                                        aria-label="account of current user"
                                        aria-controls={open ? 'basic-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                        onClick={handleClick}
                                        color="white"
                                    >
                                        <NotificationsIcon />
                                    </IconButton>
                                    <Menu
                                        id="basic-menu"
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}
                                        MenuListProps={{
                                            'aria-labelledby': 'basic-button',
                                        }}
                                    >
                                        {
                                            (notifications.notifications.isFetching)
                                                ?
                                                <MenuItem> Loading... <PendingIcon /></MenuItem>
                                                : (
                                                    (notifications.notifications.length === 0)
                                                        ?
                                                        <MenuItem>No new notification</MenuItem>
                                                        :
                                                        notifications.notifications.map((item) => (
                                                            <MenuItem>
                                                                {item.creator.id === auth.loggedInUser.id
                                                                    ?
                                                                    "You"
                                                                    :
                                                                    item.creator.name} {item.notificationType}
                                                                <Typography
                                                                    sx={{ mt: 1.5, ml: 1 }}
                                                                    variant="caption"
                                                                    display="block"
                                                                    gutterBottom
                                                                >
                                                                    {timediffrence(item.actedAt)}
                                                                </Typography>
                                                            </MenuItem>
                                                        ))
                                                )
                                        }

                                    </Menu>
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
                                </Box>
                            }
                        </Stack >
                    </Toolbar >
                </AppBar >
                <div id='detail'>
                    <Outlet />
                </div>
            </Box>
        </ThemeProvider >
    );
};

Header.propTypes = {
    auth: authProps.isRequired,
    notifications: notificationProps.isRequired
};

export default connect((state) => ({
    auth: state.auth,
    notifications: state.notifications
}))(Header);
