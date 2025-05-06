import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  useTheme,
  Container,
  Tooltip,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
} from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import CalculateIcon from '@mui/icons-material/Calculate';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ErrorIcon from '@mui/icons-material/Error';
import MenuIcon from '@mui/icons-material/Menu';
import { useThemeContext } from '../contexts/ThemeContext';

const Header = () => {
  const theme = useTheme();
  const { mode, toggleTheme } = useThemeContext();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const navItems = [
    { name: 'Calculator', path: '/', icon: <CalculateIcon /> },
    { name: 'Exchange Rates', path: '/exchange-rates', icon: <CurrencyExchangeIcon /> },
    { name: 'About', path: '/about', icon: <HelpOutlineIcon /> },
    { name: 'Error Page', path: '/notfound', icon: <ErrorIcon /> },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  const drawer = (
    <Box onClick={toggleDrawer} sx={{ width: 250 }}>
      <List>
        {navItems.map((item) => (
          <ListItem 
            button 
            key={item.name} 
            component={RouterLink} 
            to={item.path}
            selected={isActive(item.path)}
            sx={{
              borderRadius: 2,
              mb: 1,
              mx: 1,
              '&.Mui-selected': {
                backgroundColor: theme.palette.primary.main + '20',
                '&:hover': {
                  backgroundColor: theme.palette.primary.main + '30',
                },
              },
            }}
          >
            <ListItemIcon sx={{ color: isActive(item.path) ? theme.palette.primary.main : 'inherit' }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.name} 
              primaryTypographyProps={{ 
                fontWeight: isActive(item.path) ? 600 : 400,
                color: isActive(item.path) ? theme.palette.primary.main : theme.palette.text.primary
              }} 
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar 
      position="sticky" 
      elevation={0}
      sx={{
        backgroundColor: theme.palette.background.paper,
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ height: 70 }}>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: theme.palette.primary.main,
              fontWeight: 700,
              fontSize: { xs: '1.2rem', sm: '1.5rem' },
              display: 'flex',
              alignItems: 'center',
              '&:hover': {
                color: theme.palette.primary.dark,
              },
            }}
          >
            <CalculateIcon sx={{ mr: 1, fontSize: '1.8rem' }} />
            EMI Calculator
          </Typography>

          {isMobile ? (
            <>
              <Tooltip title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}>
                <IconButton 
                  onClick={toggleTheme} 
                  color="inherit"
                  sx={{
                    color: theme.palette.text.primary,
                    mr: 1,
                  }}
                >
                  {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
                </IconButton>
              </Tooltip>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={toggleDrawer}
                sx={{ color: theme.palette.text.primary }}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={toggleDrawer}
              >
                {drawer}
              </Drawer>
            </>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {navItems.map((item) => (
                <Button
                  key={item.name}
                  component={RouterLink}
                  to={item.path}
                  startIcon={item.icon}
                  variant={isActive(item.path) ? "contained" : "text"}
                  disableElevation
                  sx={{
                    color: isActive(item.path) ? '#fff' : theme.palette.text.primary,
                    backgroundColor: isActive(item.path) ? theme.palette.primary.main : 'transparent',
                    borderRadius: 2,
                    px: 2,
                    py: 1,
                    '&:hover': {
                      backgroundColor: isActive(item.path) 
                        ? theme.palette.primary.dark 
                        : theme.palette.action.hover,
                    },
                  }}
                >
                  {item.name}
                </Button>
              ))}
              <Tooltip title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}>
                <IconButton 
                  onClick={toggleTheme} 
                  color="inherit"
                  sx={{
                    color: theme.palette.text.primary,
                    ml: 1,
                    '&:hover': {
                      backgroundColor: theme.palette.action.hover,
                    },
                  }}
                >
                  {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
                </IconButton>
              </Tooltip>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;