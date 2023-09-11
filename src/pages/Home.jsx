import { useEffect } from "react";
import { useState } from "react";
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import { Box } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import Message from "../components/Message";
import { getMessagesAction, createMessageAction } from "../redux/actions/messageAction";
import { authProps, messageProps } from '../shared/prop-types/reducerProps';

function Home({ auth, messages, dispatch }) {

    const navigate = useNavigate();

    const [newMessage, setNewMessage] = useState();

    const handleChange = (e) => {
        setNewMessage(e.target.value);
    };

    const handleSubmit = () => {
        const createMessageBody = {
            content: newMessage,
        }
        dispatch(createMessageAction(createMessageBody, auth.tokens.access.token));
        getMessages();
        setNewMessage("");
    }

    function getMessages() {
        dispatch(getMessagesAction("", auth.tokens.access.token));
    }

    useEffect(() => {
        (!auth.isLoggedIn) ? navigate('/login') : getMessages()
    }, []);

    return (
        <Box>
            <Container maxWidth="sm" sx={{ my: 2, }}>
                <TextField fullWidth label="create message" value={newMessage} onChange={handleChange} ></TextField>
                <LoadingButton
                    onClick={handleSubmit}
                    variant="contained"
                    sx={{ mt: 2, mb: 0 }}
                    size="small"
                    loading={messages.isFetching}
                    loadingPosition="end"
                >
                    <span>post</span>
                </LoadingButton>
            </Container>


            {messages.messages.map((item) => (
                <Message postedBy={item.postedBy} messageContent={item.content} likes={item.likes} messageId={item.id} />
            ))}
        </Box>
    );
}

Home.propTypes = {
    auth: authProps.isRequired,
    messages: messageProps.isRequired
};

export default connect((state) => ({
    auth: state.auth,
    messages: state.messages
}))(Home);