import { AppBar, Toolbar, Stack, Link } from '@mui/material'
import * as React from 'react';
import { connect } from 'react-redux';
import { authProps } from '../shared/prop-types/reducerProps';
import Typography from '@mui/material/Typography';
import PersonIcon from '@mui/icons-material/Person';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';


function Profile({ auth }) {
    console.log("auth from profile", auth);
    return (
        <Container maxWidth="sm" sx={{ alignItems: 'center' }} >

            <Box sx={{ p: 2, m: 10, border: '1px dashed grey', backgroundColor: 'primary.main' }}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    // onClick={showProfile}
                    color="inherit"
                >
                    <PersonIcon />
                </IconButton>
                <Stack direction='row' spacing={15} margin={5}>
                    <Typography component="h1" variant="h5">Name</Typography>
                    <Typography component="h1" variant="h5">{auth.loggedInUser.name}</Typography>
                </Stack>
                <Stack direction='row' spacing={15} margin={5}>
                    <Typography component="h1" variant="h5">Email</Typography>
                    <Typography component="h1" variant="h5">{auth.loggedInUser.email}</Typography>
                </Stack>
            </Box>
        </Container >
    )
}

Profile.propTypes = {
    auth: authProps.isRequired,
};

export default connect((state) => ({
    auth: state.auth,
}))(Profile);
