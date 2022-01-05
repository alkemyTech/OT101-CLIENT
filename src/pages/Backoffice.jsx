import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
//import { useSelector } from 'react-redux';

import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import ListItemButton from '@mui/material/ListItemButton';

import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuIcon from '@mui/icons-material/Menu';

import LanguageIcon from '@mui/icons-material/Language';

const drawerWidth = 200;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open' })(
        ({ theme, open }) => ({
            zIndex: theme.zIndex.drawer + 1,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

const mdTheme = createTheme();

export default function Backoffice({routes}) {
    const [open, setOpen] = useState(false);
//    const { role } = useSelector((state) => state.user);
    const role = 'admin'; // temporary until login fully functional
    const allowedRoutes = routes.filter(route => route.roles.includes(role));

    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="absolute" open={open}>
                    <Toolbar
                        sx={{
                            pr: '24px', // keep right padding when drawer closed
                            backgroundColor: '#9AC9FB'
                        }}
                    >
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '36px',
                                color: 'black'
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                            <Typography
                                component="h1"
                                variant="h6"
                                color="black"
                                fontFamily='Signika'
                            >
                            Administracion del sitio
                            </Typography>
                            <Tooltip placement='left' title='Sitio web'>
                                <IconButton
                                    to='/'
                                    LinkComponent={Link}
                                    sx={{display: 'block', marginLeft: 'auto', }}
                                >
                                    <LanguageIcon sx={{marginTop: '10px'}}/>
                                </IconButton>
                            </Tooltip>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open}>
                    <Toolbar />
                    <List>
                        { allowedRoutes.map(route => (
                            <Tooltip 
                                key={route.name}
                                placement='right'
                                title={open ? '' : route.name}
                            >
                                <ListItemButton
                                    component={Link}
                                    to={route.path}
                                >
                                    <ListItemIcon>
                                        { route.icon }
                                    </ListItemIcon>
                                    <Typography sx={{fontFamily:'Signika'}}>
                                        {route.name}
                                    </Typography>
                                </ListItemButton>
                            </Tooltip>
                        ))
                    }
                    </List>
                </Drawer>
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar />
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        <Outlet />
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
};
