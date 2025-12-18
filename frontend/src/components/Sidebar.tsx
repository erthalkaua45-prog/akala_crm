import React from 'react';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Avatar, IconButton } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import ListAltIcon from '@mui/icons-material/ListAlt';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import akalaLogo from '../assets/sara.png';

interface SidebarProps {
    open: boolean;
    onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, onToggle }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        { text: 'Overview', icon: <DashboardIcon />, path: '/dashboard' },
        { text: 'Clientes', icon: <PeopleIcon />, path: '/customers' },
        { text: 'Listas', icon: <ListAltIcon />, path: '/lists' },
    ];

    return (
        <Box
            component={motion.div}
            initial={{ width: open ? 280 : 80 }}
            animate={{ width: open ? 280 : 80 }}
            transition={{ duration: 0.3 }}
            sx={{
                height: '100vh',
                bgcolor: 'background.paper',
                borderRight: '1px solid rgba(255,255,255,0.05)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                position: 'fixed',
                left: 0,
                top: 0,
                zIndex: 1200,
            }}
        >
            <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: open ? 'space-between' : 'center' }}>
                {open && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar sx={{ bgcolor: 'primary.main' }} src={akalaLogo}>A</Avatar>
                        <Typography variant="h6" noWrap>
                            Sara - Admin
                        </Typography>
                    </Box>
                )}
                <IconButton onClick={onToggle} sx={{ color: 'text.secondary' }}>
                    <MenuIcon />
                </IconButton>
            </Box>

            <List sx={{ mt: 2 }}>
                {menuItems.map((item) => (
                    <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                            onClick={() => navigate(item.path)}
                            selected={location.pathname === item.path}
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                                mx: 1,
                                borderRadius: 2,
                                '&.Mui-selected': {
                                    bgcolor: 'primary.main',
                                    color: 'white',
                                    '&:hover': {
                                        bgcolor: 'primary.dark',
                                    },
                                    '& .MuiListItemIcon-root': {
                                        color: 'white',
                                    },
                                },
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                    color: location.pathname === item.path ? 'white' : 'text.secondary',
                                }}
                            >
                                {item.icon}
                            </ListItemIcon>
                            {open && <ListItemText primary={item.text} />}
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default Sidebar;
