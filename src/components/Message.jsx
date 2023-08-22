import { Box } from "@mui/material"
import React from 'react';
import { Avatar, Card, CardContent, CardHeader, TextField, CardActions, Button, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Start } from "@mui/icons-material";


export default function Home() {
    return (
        <Card sx={{ marginX: '3em', marginY: '2em', padding: 0, }}>
            <CardHeader
                // title=                                             "Shrimp and Chorizo Paella"
                title={
                    <Typography sx={{ display: 'flex', alignItems: 'flex-start', fontWeight: 600, p: 0 }} variant="h6">Harshit</Typography>

                }

                sx={{
                    display: 'flex',
                    alignItems: 'flex-start'
                }}

            />
            < CardContent  >
                <Typography  >Hello everyone my name is pradep</Typography>
                <Typography >hlo </Typography>
            </CardContent >
            <CardActions>
                <FavoriteIcon></FavoriteIcon> <Typography >15</Typography>
            </CardActions>
        </Card >
    );
} 