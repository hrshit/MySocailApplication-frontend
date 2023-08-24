import { useEffect } from "react";
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box } from "@mui/material";
import Message from "../components/Message";
import { getMessagesAction } from "../redux/actions/messageAction";
import { authProps, messageProps } from '../shared/prop-types/reducerProps';

function Home({ auth, messages, dispatch }) {

    const navigate = useNavigate();

    function getMessages() {
        dispatch(getMessagesAction("", auth.tokens.access.token));
    }

    useEffect(() => {
        (!auth.isLoggedIn) ? navigate('/login') : getMessages()
    }, []);

    return (
        <Box>
            {messages.messages.map((item) => (
                <Message postedBy={item.postedBy.name} messageContent={item.content} likeCount={item.likes.length} />
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