import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import AddIcon from '@mui/icons-material/Add';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import SettingsIcon from '@mui/icons-material/Settings';
import StorageIcon from '@mui/icons-material/Storage';
import PostAddIcon from '@mui/icons-material/PostAdd';
import DefineMappings from './DefineMappings';
import Overview from './Overview';
import AddDatabase from './AddDatabase';
import DataImport from './DataImport';
import DataExport from './DataExport';
import MappingList from './MappingList';
import CustomMapping from './CreateCustomMapping';

const drawerWidth = 240;

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

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Dashboard({ userID, userName, isUserAdmin }) {
  const [open, setOpen] = useState(true);
  const [tab, setTab] = useState('Overview');
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Drawer variant="permanent" open={open}>
          <Toolbar sx={{ paddingLeft: 0 }} disableGutters>
            <ListItemButton onClick={toggleDrawer}>
              <ListItemIcon>
                {open ? <ChevronLeftIcon /> : <MenuIcon />}
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {
              isUserAdmin && (
                <>
                  <ListItemButton onClick={() => setTab('Overview')}>
                    <ListItemIcon>
                      <StorageIcon />
                    </ListItemIcon>
                    <ListItemText primary="Overview" />
                  </ListItemButton>
                  <ListItemButton onClick={() => setTab('Create Mapping')}>
                    <ListItemIcon>
                      <AddIcon />
                    </ListItemIcon>
                    <ListItemText primary="Create Mapping" />
                  </ListItemButton>
                  <ListItemButton onClick={() => setTab('Custom Mapping')}>
                    <ListItemIcon>
                      <DashboardCustomizeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Custom Mapping" />
                  </ListItemButton>
                </>
              )
          }
            <ListItemButton onClick={() => setTab('Mappings')}>
              <ListItemIcon>
                <FormatListBulletedIcon />
              </ListItemIcon>
              <ListItemText primary="Mappings" />
            </ListItemButton>
            {isUserAdmin && (
            <ListItemButton onClick={() => setTab('Add Database')}>
              <ListItemIcon>
                <PostAddIcon />
              </ListItemIcon>
              <ListItemText primary="Add Database" />
            </ListItemButton>
            )}
            <ListItemButton onClick={() => setTab('Export Data')}>
              <ListItemIcon>
                <FileDownloadIcon />
              </ListItemIcon>
              <ListItemText primary="Export Data" />
            </ListItemButton>
            <ListItemButton onClick={() => setTab('Import Data')}>
              <ListItemIcon>
                <FileUploadIcon />
              </ListItemIcon>
              <ListItemText primary="Import Data" />
            </ListItemButton>
            <Divider sx={{ my: 1 }} />
            <ListItemButton>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) => (theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900]),
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            {tab === 'Overview' && (<Overview userID={userID} userName={userName} />)}
            {tab === 'Create Mapping' && (<DefineMappings userID={userID} userName={userName} />)}
            {tab === 'Add Database' && (<AddDatabase userID={userID} userName={userName} />)}
            {tab === 'Import Data' && (<DataImport userID={userID} userName={userName} />)}
            {tab === 'Export Data' && (<DataExport userID={userID} userName={userName} />)}
            {tab === 'Mappings' && (<MappingList userID={userID} userName={userName} />)}
            {tab === 'Custom Mapping' && (<CustomMapping userID={userID} userName={userName} />)}
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

Dashboard.propTypes = {
  userID: PropTypes.number.isRequired,
  userName: PropTypes.string.isRequired,
  isUserAdmin: PropTypes.bool.isRequired,
};
