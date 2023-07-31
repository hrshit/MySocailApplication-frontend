import React from 'react';
import './Header.css';
import { AppBar, Toolbar, Stack, Link } from '@mui/material'


const Header = () => {
    return (
        <AppBar position='static' >
            <Toolbar>
                <Stack direction='row' spacing={2}>
                    <Link href='/' color='inherit'>Home</Link>
                    <Link href='/register' color='inherit'>Register</Link>
                    <Link href='/login' color='inherit'>Login</Link>
                </Stack>
            </Toolbar>
        </AppBar>
    );
};

export default Header;