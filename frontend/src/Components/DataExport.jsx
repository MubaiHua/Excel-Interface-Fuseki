/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import {
  Typography, Button, Container, Grid, MenuItem, Paper, Select, Alert,
} from '@mui/material';
import { getAllDatabase, getAllMappings, getExportExcel } from '../Utils/FusekiAPI';

function DataExport() {
  const [database, setDatabase] = useState('');
  const [mapping, setMapping] = useState('');
  const [allDatabase, setAllDatabase] = useState([]);
  const [allMappings, setAllMappings] = useState([]);

  useEffect(() => {
    getAllDatabase()
      .then((data) => {
        setAllDatabase(data);
      }).catch(() => {
        alert('Fail to get database');
      });
  }, []);

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

  const handleDatabaseChange = (event) => {
    setDatabase(event.target.value);
  };

  const handleMappingChange = (event) => {
    setMapping(event.target.value);
  };

  const handleExport = async () => {
    let dbName = '';
    for (let i = 0; i < allDatabase.length; i++) {
      if (allDatabase[i].id === database) {
        dbName = allDatabase[i].name;
        break;
      }
    }
    if (dbName === '') {
      alert('Fail to export');
      return;
    }
    const payload = { dbName, mapping_id: mapping };
    getExportExcel(payload)
      .then((response) => {
        const filename = response.headers['content-type'];
        const blob = new Blob([response.data], { type: 'text/csv' });
        // Create a download link and trigger a click event
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename; // Specify the file name
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        // Revoke the Object URL to free up resources
        URL.revokeObjectURL(url);
      })
      .catch(() => {
        alert('Fail to export');
      });
  };

  return (
    <Container component="main" maxWidth="md">
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        {!(database !== '' && allDatabase.length === 0) || (mapping !== '' && allMappings.length === 0)
          ? (
            <Typography variant="h5" align="center" gutterBottom>
              CSV File Uploader
            </Typography>
          )
          : allDatabase.length === 0 ? (
            <Typography variant="h5" align="center" gutterBottom>
              No database available
            </Typography>
          ) : (
            <Typography variant="h5" align="center" gutterBottom>
              No mapping in this database available
            </Typography>
          )}

        {!(database !== '' && allMappings.length === 0) && (
        <>
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
                  Select Database
                </MenuItem>
                {allDatabase.map((db) => (<MenuItem value={db.id}>{db.name}</MenuItem>))}
              </Select>
            </Grid>
            <Grid item xs={12}>
              <Select
                value={mapping}
                onChange={handleMappingChange}
                fullWidth
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
              >
                <MenuItem value="" disabled>
                  Select Mapping
                </MenuItem>
                {allMappings.map((mp) => (<MenuItem value={mp.id}>{mp.name}</MenuItem>))}
              </Select>
            </Grid>
          </Grid>
          <Alert severity="warning" style={{ marginTop: '20px' }}>The name of the csv file exported is the Export ID, please remember it or DO NOT change it</Alert>
          <Button variant="contained" color="primary" onClick={handleExport} fullWidth style={{ padding: '20px', marginTop: '20px', height: '15px' }}>
            Export
          </Button>
        </>
        )}
      </Paper>
    </Container>
  );
}

export default DataExport;
