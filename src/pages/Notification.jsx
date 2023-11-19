import { IconButton, CardContent } from '@mui/material'
import * as React from 'react';
import { useEffect } from "react";
import { connect } from 'react-redux';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { authProps, notificationProps } from '../shared/prop-types/reducerProps';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import InfiniteScroll from 'react-infinite-scroller';
import Container from '@mui/material/Container';
import { getNotificationAction } from '../redux/actions/notificationActions';

function Notification({ auth, notifications, dispatch }) {

    useEffect(() => {
        getNotification();
    }, []);

    const getNotification = async () => {
        let params = '';
        params = params + "?receiver=" + auth.loggedInUser.id;
        console.log("from notification", auth.loggedInUser.id);
        params = params + "&sortBy=postedAt:desc";
        await dispatch(getNotificationAction(params, auth.tokens.access.token));
    };

    console.log("notifications from notification page", notifications.notifications)

    return (
        <Container maxWidth="sm">
            <Box sx={{ m: 2 }}>
                {notifications.notifications.map((item) => (
                    <Card sx={{ minWidth: 0, p: "auto" }}>
                        <CardContent sx={{ display: "flex", flexDirection: "row" }} >
                            <IconButton
                                color={"primary"}
                            >
                                <FavoriteIcon />
                            </IconButton>
                            <Typography sx={{ justifyContent: "center" }} variant="h6">{item.creator.id === auth.loggedInUser.id ? "you" : item.creator.name}  {item.notificationType}</Typography>

                        </CardContent>
                    </Card>
                ))}
            </Box>

        </Container >
    )
}

Notification.propTypes = {
    auth: authProps.isRequired,
    notifications: notificationProps.isRequired
};

export default connect((state) => ({
    auth: state.auth,
    notifications: state.notifications
}))(Notification);
