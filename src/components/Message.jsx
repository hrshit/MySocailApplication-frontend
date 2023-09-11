
import React from 'react';
import { useState } from "react";
import { connect } from 'react-redux';
import { Avatar, Card, CardContent, CardHeader, CardActions, Button, Typography, Container, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LoadingButton from '@mui/lab/LoadingButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { authProps, messageProps } from '../shared/prop-types/reducerProps';
import { likeMessageAction, getMessagesAction, deleteMessageAction } from "../redux/actions/messageAction";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function Message({ postedBy, messageContent, likes, messageId, auth, dispatch, messages }) {
    const [liked, setLiked] = useState(((likes.filter((user) => (user.id == auth.loggedInUser.id))).length > 0));
    const [likesCount, setLikesCount] = useState(likes.length);
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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

    const updateLikes = async () => {
        await dispatch(likeMessageAction(messageId, auth.tokens.access.token));
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

    const deleteMessage = async () => {
        await dispatch(deleteMessageAction(messageId, auth.tokens.access.token));
        dispatch(getMessagesAction("", auth.tokens.access.token));
        () => close()
    }

    return (
        <Container maxWidth="sm"  >
            <Card sx={{ my: 5, display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: "primary" }} >
                            <PersonOutlineIcon />
                        </Avatar>
                    }
                    title={<Typography sx={{ fontWeight: 600, p: 0, marginRight: "18rem" }} variant="h6" component="span">{postedBy.name}</Typography>}
                    action={
                        (postedBy.id == auth.loggedInUser.id)
                        &&
                        <div>
                            <Button variant="outlined" onClick={handleClickOpen}>
                                <DeleteOutlineIcon />
                            </Button>
                            <Dialog
                                open={open}
                                TransitionComponent={Transition}
                                keepMounted
                                onClose={handleClose}
                                aria-describedby="alert-dialog-slide-description"
                            >
                                <DialogTitle>{"Delete Message"}</DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-slide-description">
                                        Are you sure you want to delete the message?                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose}>NO</Button>
                                    <Button onClick={deleteMessage}>yes</Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                    }
                >
                </CardHeader>
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
    messages: messageProps.isRequired
};

export default connect((state) => ({
    auth: state.auth,
    messages: state.messages
}))(Message);


