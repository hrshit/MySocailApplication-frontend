import { useEffect } from "react";
import { useState } from "react";
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import { Box } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import Message from "../components/Message";
import { getMessagesAction, createMessageAction } from "../redux/actions/messageAction";
import { authProps, messageProps } from '../shared/prop-types/reducerProps';

function Home({ auth, messages, dispatch }) {

    const navigate = useNavigate();

    useEffect(() => {
        (!auth.isLoggedIn) && navigate('/login');
    }, []);

    const [newMessage, setNewMessage] = useState();
    const [hasitem, setHasItem] = useState(true);
    const handleChange = (e) => {
        setNewMessage(e.target.value);
    };

    const getMessages = async (isRefereshRequired = false, limit = 10) => {
        if (!messages.isFetching) {
            let params = '';
            let page = isRefereshRequired ? 1 : (messages.page + 1);
            params = params + "?page=" + page;
            params = params + "&limit=" + limit;
            params = params + "&sortBy=postedAt:desc";
            if (messages.page > 0 && (page > messages.totalPages))
                setHasItem(false);
            else
                await dispatch(getMessagesAction(params, auth.tokens.access.token));
        }
    };

    const handleSubmit = async () => {
        const createMessageBody = {
            content: newMessage,
        }
        await dispatch(createMessageAction(createMessageBody, auth.tokens.access.token));
        setNewMessage("");
        await getMessages(true);
        setHasItem(true);
    }

    return (
        <Box>
            <Container maxWidth="sm" sx={{ my: 2, }}>
                <TextField
                    fullWidth label="create message"
                    value={newMessage}
                    onChange={handleChange}
                >
                </TextField>
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

            <InfiniteScroll
                loadMore={async () => getMessages()}
                hasMore={hasitem}
                loader={<div>Loading ...</div>}
            >
                {messages.messages.map((item) => (
                    <Message
                        id={item.id}
                        postedBy={item.postedBy}
                        messageContent={item.content}
                        likes={item.likes}
                        messageId={item.id}
                    />
                ))}
            </InfiniteScroll>

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