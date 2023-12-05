/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import {
  Typography, Button, Container, Grid, MenuItem, Paper, Select, Alert, TextField,
} from '@mui/material';
import {
  getAllDatabase, getAllMappings, getExportExcel, getPredicates,
} from '../Utils/FusekiAPI';
import FilterSelectionTable from './FilterSelectionTable';

function DataExport() {
  const [database, setDatabase] = useState('');
  const [mapping, setMapping] = useState('');
  const [allDatabase, setAllDatabase] = useState([]);
  const [allMappings, setAllMappings] = useState([]);
  const [orderBy, setOrderBy] = useState('');
  const [limit, setLimit] = useState('');
  const [allPredicates, setAllPredicates] = useState([]);
  const [allFilters, setAllFilters] = useState({});
  const [direction, setDirection] = useState('');

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

  useEffect(() => {
    if (mapping !== '') {
      getPredicates({ mappingID: mapping })
        .then((data) => {
          setAllPredicates(data);
        }).catch(() => {
          alert('Fail to get mappings');
        });
    }
  }, [mapping]);

  const handleDatabaseChange = (event) => {
    setDatabase(event.target.value);
  };

  const handleMappingChange = (event) => {
    setMapping(event.target.value);
  };

  const handleFilterChange = (data) => {
    if (data) {
      const newData = {};
      data.forEach((element) => {
        newData[element.predicate] = element.text;
      });
      setAllFilters(newData);
    }
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
    const payload = {
      dbName, mapping_id: mapping, limit,
    };
    if (orderBy !== '' && direction !== '') {
      payload.order_by_var = orderBy;
      payload.order_by = direction;
    }
    if (limit !== '') {
      payload.limit = limit;
    }
    if (Object.keys(allFilters).length !== 0) {
      payload.filter_equals = JSON.stringify(allFilters);
    }
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
              CSV File Downloader
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
            {(mapping !== '' && database != '') && (
            <>
              <Grid item xs={12}>
                {' '}
                <Typography variant="subtitle1" align="left" color="textSecondary">
                  Optional Fields: Customize your export by specifying OrderBy and Limit.
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Select
                  value={orderBy}
                  onChange={(event) => setOrderBy(event.target.value)}
                  fullWidth
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                >
                  <MenuItem value="" disabled>
                    Order By
                  </MenuItem>
                  {/* Add options based on your specific ordering requirements */}
                  {allPredicates.map((pr) => (<MenuItem value={pr}>{pr}</MenuItem>))}
                </Select>
              </Grid>
              <Grid item xs={12}>
                <Select
                  value={direction}
                  onChange={(event) => setDirection(event.target.value)}
                  fullWidth
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                >
                  <MenuItem value="desc">
                    desc
                  </MenuItem>
                  <MenuItem value="asc">
                    asc
                  </MenuItem>
                </Select>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Limit"
                  type="number"
                  fullWidth
                  value={limit}
                  onChange={(event) => setLimit(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <FilterSelectionTable allPredicates={allPredicates} onDataUpdate={handleFilterChange} />
              </Grid>
            </>
            )}
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
