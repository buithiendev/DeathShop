import { Avatar, Divider, IconButton, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function UserOptions({ avatar }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        localStorage.setItem('current-user', JSON.stringify(undefined));
    };

    return (
        <>
            <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
            >
                <Avatar alt="avt" src={avatar} />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        width: 140,
                        '& .MuiMenuItem-root': {
                            fontSize: 13,
                            fontFamily: 'Poppins, sans-serif',
                            py: 1,
                            color: 'var(--text-color)',

                            '&:hover': {
                                backgroundColor: 'var(--primary-color)',
                                color: '#fff',
                            },
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 18,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                        '& a': {
                            textDecoration: 'none',
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <Link >
                    <MenuItem> My Profile</MenuItem>
                </Link>
                <Link to="/settings">
                    <MenuItem> Settings</MenuItem>
                </Link>
                <Divider />
                <Link to="/login">
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Link>
            </Menu>
        </>
    );
}

export default UserOptions;
