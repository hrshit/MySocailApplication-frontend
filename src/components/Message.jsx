
import React from 'react';
import { useState } from "react";
import { connect } from 'react-redux';
import { Avatar, Card, CardContent, CardHeader, CardActions, Button, Typography, Container, IconButton, Box } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { authProps, messageProps } from '../shared/prop-types/reducerProps';
import { likeMessageAction, getMessagesAction, deleteMessageAction, updateMessageAction } from "../redux/actions/messageAction";
import { Widgets } from '@mui/icons-material';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function Message({ postedBy, messageContent, likes, messageId, auth, dispatch, messages }) {
    const [liked, setLiked] = useState(((likes.filter((user) => (user.id == auth.loggedInUser.id))).length > 0));
    const [likesCount, setLikesCount] = useState(likes.length);
    const [open, setOpen] = React.useState(false);
    const [editable, setEditable] = useState(false);
    const [newMessage, setNewMessage] = useState();

    const handleChange = (e) => {
        setNewMessage(e.target.value);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleEditable = async () => {
        setNewMessage(messageContent);
        setEditable(true);
    }

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
        if (liked) {
            setLiked(false)
            setLikesCount(likesCount - 1)
        }
        else {
            setLiked(true)
            setLikesCount(likesCount + 1)
        }
    }

    const updateMessage = async () => {
        const createMessageBody = {
            content: newMessage,
        }
        await dispatch(updateMessageAction(messageId, createMessageBody, auth.tokens.access.token));
        setEditable(false);
    }

    const cancelUpdate = () => setEditable(false);

    const deleteMessage = async () => {
        await dispatch(deleteMessageAction(messageId, auth.tokens.access.token));
        handleClose();
    }


    return (
        <Container maxWidth="sm"  >
            <Card sx={{ my: 5, mx: { xs: 2, md: 0 }, display: "flex", flexDirection: "column", alignItems: "start", justifyitem: 'left' }}>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: "primary" }} >
                            <PersonOutlineIcon />
                        </Avatar>
                    }
                    title={<Typography sx={{ fontWeight: 600, p: 0, marginRight: "1rem" }} variant="h6" component="span">{postedBy.name}</Typography>}
                    action={
                        (postedBy.id == auth.loggedInUser.id)
                        &&
                        <Box sx={{ ml: { xs: "1em", md: "5em" }, pl: { xs: "1em", md: "5em" } }}>
                            <Button sx={{ m: 0, p: 0 }} onClick={handleClickOpen}>
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
                                        Are you sure you want to delete the message?
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose} variant='contained' size='small'>NO</Button>
                                    <LoadingButton
                                        onClick={deleteMessage}
                                        variant="contained"
                                        size="small"
                                        loading={messages.isFetching}
                                        loadingPosition="end"
                                    >
                                        <span>yes</span>
                                    </LoadingButton>
                                </DialogActions>
                            </Dialog>
                            <Button sx={{ mr: 4, p: 0 }} onClick={handleEditable}>
                                <EditNoteIcon />
                            </Button>
                        </Box>
                    }
                >
                </CardHeader>
                < CardContent sx={{ display: 'flex', minWidth: "90%", flexDirection: "column", alignItems: "flex-start" }}  >
                    {(editable) ?
                        <>
                            <TextField
                                fullWidth
                                multiline
                                label="using Input (default)"
                                value={newMessage}
                                onChange={handleChange}
                            />
                            <Box sx={{ display: 'flex', ml: 10, flexDirection: "row" }}>
                                <LoadingButton
                                    onClick={updateMessage}
                                    variant="contained"
                                    sx={{ mr: 1, mt: 1 }}
                                    size="small"
                                    loading={messages.isFetching}
                                    loadingPosition="end"
                                >
                                    <span>Update</span>
                                </LoadingButton>
                                <Button
                                    onClick={cancelUpdate}
                                    variant='contained'
                                    sx={{ mr: 1, mt: 1 }}
                                    size="small"

                                >
                                    <span>Cancel</span>
                                </Button>


                            </Box>
                        </>
                        :
                        <Box sx={{ display: 'flex', alignItems: "start", textAlign: "left" }}>{messageContent}</Box>
                    }
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


