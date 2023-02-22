/*
* Static Responsive Navigation Bar for Invoice portal app
**@author: Anju Tuscano

*/
// Responsive Navigation Bar component

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Link from '@mui/material/Link'
import Logo from '../Media/InvoicePortalLogo.png'
import { deepOrange } from '@mui/material/colors';
import { Link as ReactLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from '../auth/LoginButton';
//Menu name array list
const pages = [
                {  
                    menuName:"View Invoices",
                    menuLinkName: "/viewInvoices"
                },
                {
                    menuName:"Create Invoice",
                    menuLinkName: "/createInvoice"
                },
                {   
                    menuName:"Inquires",
                    menuLinkName: "/inquires"
                }
            ];

//Srtting name array list
const settings = ['Profile', 'Account', 'Logout'];

function NavigationBar() {

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const { user, isAuthenticated, isLoading,logout } = useAuth0();

    return (
        <AppBar position="static" sx={{marginBottom:"20px"}}>
            <Container maxWidth="xl" sx={{ backgroundColor: "#3DA000" }}>
                <Toolbar>
                    <Link href="#" underline="none" sx={{ mr: 2, display: { xs: 'none', md: 'flex' },}}>
                        <img className="nav-logo" src={Logo} alt="Invoice Portal Logo" width="40" height="40"/>
                    </Link>
                    <Typography variant="h6" noWrap component="a" href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            color: 'inherit',
                            textDecoration: 'none',
                        }}>
                        Invoice Portal
                    </Typography>

                    {/* For Small Screen Device */}
                    {isAuthenticated && (
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page.menuLinkName} onClick={handleCloseNavMenu}>
                                    <ReactLink to={page.menuLinkName}  style={{textDecoration:'none'}}> <Typography textAlign="center">{page.menuName}</Typography></ReactLink>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    )}
                    {/* For Large Screen Device */}
                    <Link
                        href="#"
                        underline="none"
                        sx={{
                            mr: 1,
                            display: { xs: 'flex', md: 'none' },
                        }}
                    >
                        <img
                            className="nav-logo"
                            src={Logo}
                            alt="Invoice Portal Logo"
                            width="40"
                            height="40"
                        />
                    </Link>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            fontFamily: 'monospace',
                            fontWeight: 300,
                            color: 'inherit',
                            textDecoration: 'none',
                            float: 'inline-start'
                        }}
                    >
                        Invoice Portal
                    </Typography>
                    {isAuthenticated && (
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <ReactLink to={page.menuLinkName} style={{textDecoration:'none'}}><Button
                                key={page.menuName}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page.menuName}
                            </Button></ReactLink>
                        ))}
                    </Box>
                    )}
                     {isAuthenticated && (<Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar sx={{ bgcolor: deepOrange[500] }} alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            
                                <MenuItem onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">Profile</Typography>
                                </MenuItem>
                                <MenuItem onClick={() => logout({ returnTo: window.location.origin, })}>
                                    <Typography textAlign="center">Log Out</Typography>
                                </MenuItem>
                        </Menu>
                    </Box>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default NavigationBar;