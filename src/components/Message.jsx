
import React from 'react';
import { useState } from "react";
import { connect } from 'react-redux';
import { Avatar, Card, CardContent, CardHeader, TextField, CardActions, Button, Typography, Container, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { authProps } from '../shared/prop-types/reducerProps';
import { likeMessageAction, getMessagesAction } from "../redux/actions/messageAction";

function Message({ postedBy, messageContent, likes, messageId, auth, dispatch }) {

    const [liked, setLiked] = useState(((likes.filter((user) => (user.id == auth.loggedInUser.id))).length > 0));
    const [likesCount, setLikesCount] = useState(likes.length);

    const getLikeInfo = () => {
        let information;
        if (liked)
            information = (likesCount === 1) ? "You liked this" : "You and " + (likesCount - 1) + " others liked this";
        else if (likesCount === 0)
            information = ""
        else
            information = likesCount + " people liked this"
        return information
    }

    const updateLikes = () => {
        dispatch(likeMessageAction(messageId, auth.tokens.access.token));
        dispatch(getMessagesAction("", auth.tokens.access.token));
        if (liked) {
            setLiked(false)
            setLikesCount(likesCount - 1)
        }
        else {
            setLiked(true)
            setLikesCount(likesCount + 1)
        }
    }

    return (
        <Container maxWidth="sm"  >
            <Card sx={{ my: 5, display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                <CardHeader
                    title={
                        <Typography sx={{ fontWeight: 600, p: 0 }} variant="h6">{postedBy}</Typography>
                    }
                />
                < CardContent  >
                    <Typography  >{messageContent}</Typography>
                </CardContent >
                <CardActions>
                    <IconButton
                        onClick={updateLikes}
                        color={liked ? "primary" : "default"}
                    >
                        <FavoriteIcon />
                    </IconButton>
                    <Typography > {getLikeInfo()} </Typography>
                </CardActions>
            </Card >
        </Container >

    );
}

Message.propTypes = {
    auth: authProps.isRequired,
};

export default connect((state) => ({
    auth: state.auth,
}))(Message);