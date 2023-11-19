import { Stack, Avatar, Divider } from '@mui/material'
import * as React from 'react';
import { connect } from 'react-redux';
import { useEffect } from "react";
import { authProps, messageProps } from '../shared/prop-types/reducerProps';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Message from "../components/Message";


function Profile({ auth, messages }) {
    console.log("auth from profile");
    const navigate = useNavigate();

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
    useEffect(() => {
        (!auth.isLoggedIn) ? navigate('/login') : " "
    }, []);
    return (
        <Container maxWidth="md" sx={{ alignItems: 'center' }} >
            <Box sx={{ p: 0, my: 5, mx: 0, border: '1px solid black', backgroundColor: '#fff' }}>

                <Stack spacing={1} direction="row" >
                    {/* <Box sx={{ pl: { xs: 5, md: "18rem" }, pt: 7, pb: 5 }}> */}
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <Typography component="h1" variant="h6"><PersonIcon sx={{ mr: 1 }} /> {auth.loggedInUser.name}</Typography>
                        <Typography component="h1" variant="subtitle2"> <EmailIcon sx={{ mr: 1 }} />{auth.loggedInUser.email}</Typography>
                    </Box>

                </Stack>
                <Divider>
                    <Typography variant="subtitle2" display="block" gutterBottom>
                        LATTESTS POSTS
                    </Typography>
                </Divider>
                {
                    ((messages.messages.filter((item) => (item.postedBy.id == auth.loggedInUser.id))).length == 0)
                        ? (<Typography sx={{ m: 5 }} variant="body" display="block" gutterBottom>
                            .......You did not Post anything....
                        </Typography>)
                        : (messages.messages.filter((item) => (item.postedBy.id == auth.loggedInUser.id))).map((item) => (
                            < Message postedBy={item.postedBy} messageContent={item.content} likes={item.likes} messageId={item.id} />
                        ))
                }
            </Box >


        </Container >
    )
}

Profile.propTypes = {
    auth: authProps.isRequired,
    messages: messageProps.isRequired
};

export default connect((state) => ({
    auth: state.auth,
    messages: state.messages
}))(Profile);
