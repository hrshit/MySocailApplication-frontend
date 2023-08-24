import { Box } from "@mui/material"
import React from 'react';
import { Avatar, Card, CardContent, CardHeader, TextField, CardActions, Button, Typography, Container, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Start } from "@mui/icons-material";


export default function Message({ postedBy, messageContent, likeCount }) {

    console.log("messages prop", postedBy, messageContent, likeCount);
    return (
        <Container maxWidth="sm" >
            <Card sx={{ my: 5 }}>
                <CardHeader
                    title={
                        <Typography sx={{ fontWeight: 600, p: 0 }} variant="h6">{postedBy}</Typography>
                    }

                />
                < CardContent  >
                    <Typography  >{messageContent}</Typography>
                </CardContent >
                <CardActions>
                    <IconButton>
                        <FavoriteIcon />
                    </IconButton>
                    <Typography >{likeCount}</Typography>
                </CardActions>
            </Card >
        </Container >

    );
} 