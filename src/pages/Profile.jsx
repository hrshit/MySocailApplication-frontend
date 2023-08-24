import { Stack, Avatar, Divider } from '@mui/material'
import * as React from 'react';
import { connect } from 'react-redux';
import { authProps } from '../shared/prop-types/reducerProps';
import Typography from '@mui/material/Typography';
import PersonIcon from '@mui/icons-material/Person';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';


function Profile({ auth }) {
    console.log("auth from profile", auth);

    const dpStyles = {
        display: "flex",
        flexDirection: "row",
        height: "10rem",
        width: "10rem",
        backgroundColor: '#fff',
        border: "1px solid black ",
        borderRadius: "5em",
        justifyContent: "center",
        alignItems: "center",
        margin: "4em 0 0em 0",
        padding: "0em"
    }
    return (
        <Container maxWidth="md" sx={{ alignItems: 'center' }} >
            <Box sx={{ p: 2, m: 5, border: '1px solid black', backgroundColor: '#fff' }}>
                <Divider textAlign="left">
                    <Box sx={dpStyles}>
                        <PersonIcon sx={{ height: "5em", width: "5em" }} />
                        {/* <Avatar alt="Remy Sharp" src="feed.png" sx={{ height: "5em", width: "5em" }} /> */}
                    </Box>
                </Divider >
                <Stack direction='column' spacing={2} >
                    <Typography component="h1" variant="h5">{auth.loggedInUser.name}</Typography>
                    <Typography component="h1" variant="h5">{auth.loggedInUser.email}</Typography>
                    <Typography component="h1" variant="h5">Harshit</Typography>
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
