/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import {
  Typography, Container, Grid, MenuItem, Paper, Select, List, ListItem, ListItemText, ListItemIcon,
} from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import { getAllDatabase, getAllMappings } from '../Utils/FusekiAPI';

/**
 * React component for displaying a list of mappings based on selected databases.
 * @component
 * @returns {JSX.Element} MappingList component.
 */
function MappingList() {
  const [database, setDatabase] = useState('');
  const [allDatabase, setAllDatabase] = useState([]);
  const [allMappings, setAllMappings] = useState([]);

  /**
   * Fetches all databases on component mount.
   */
  useEffect(() => {
    getAllDatabase()
      .then((data) => {
        setAllDatabase(data);
      }).catch(() => {
        alert('Fail to get database');
      });
  }, []);

  /**
   * Fetches all mappings when the selected database changes.
   * @param {Object} event - The event object from the database select change.
   */
  useEffect(() => {
    if (database !== '') {
      getAllMappings({ databaseID: database })
        .then((data) => {
          setAllMappings(data);
        }).catch(() => {
          alert('Fail to get mappings');
        });
    }
  }, [database]);

  /**
   * Handles the change of the selected database.
   * @param {Object} event - The event object from the database select change.
   */
  const handleDatabaseChange = (event) => {
    setDatabase(event.target.value);
  };

  return (
    <Container component="main" maxWidth="md">
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h5" align="center" gutterBottom>
          Find Out Your Mapping List
        </Typography>

        {/* Select a database */}
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Select
              value={database}
              onChange={handleDatabaseChange}
              fullWidth
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem value="" disabled>
                Please select a database
              </MenuItem>
              {allDatabase.map((db) => (
                <MenuItem key={db.id} value={db.id}>{db.name}</MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>

        {/* Mapping List */}
        {database && (
        <Paper elevation={2} style={{ padding: '20px', marginTop: '20px' }}>
          <Typography variant="h6" align="left" gutterBottom>
            Available Mappings
          </Typography>
          <List>
            {allMappings.map((mp) => (
              <ListItem key={mp.id}>
                <ListItemIcon>
                  <CircleIcon />
                  {' '}
                  {/* Icon added here */}
                </ListItemIcon>
                <ListItemText primary={mp.name} />
              </ListItem>
            ))}
          </List>
        </Paper>
        )}

      </Paper>
    </Container>
  );
}

export default MappingList;
