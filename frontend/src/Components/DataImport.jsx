/* eslint-disable no-nested-ternary */
import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  Box, Typography, Button, Container, Grid, MenuItem, Paper, Select,
} from '@mui/material';
import { getAllDatabase, getAllMappings } from '../Utils/FusekiAPI';

function DataImport() {
  const [file, setFile] = useState(null);
  const [database, setDatabase] = useState('');
  const [mapping, setMapping] = useState('');
  const [csvData, setCSVData] = useState(null);
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

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const fileContent = event.target.result;
        // Assuming each line in the CSV file is separated by a newline character
        const parsedData = fileContent.split('\n');

        // Update the state with the parsed data
        setCSVData(parsedData);
      };
      reader.readAsText(acceptedFiles[0]);
    }
  }, []);
  const handleDatabaseChange = (event) => {
    setDatabase(event.target.value);
  };

  const handleMappingChange = (event) => {
    setMapping(event.target.value);
  };

  const handleUpload = async () => {
    console.log(csvData);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: '.csv',
    multiple: false,
  });

  return (
    <Container component="main" maxWidth="md">
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        {(database !== '' && allDatabase.length === 0) || (mapping !== '' && allMappings.length === 0)
          ? (
            <Typography variant="h5" align="center" gutterBottom>
              CSV File Uploader
            </Typography>
          )
          : database.length === 0 ? (
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
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="200px"
            border="2px dashed #d9d9d9"
            borderRadius="4px"
            {...getRootProps()}
            p={2}
            my={2}
          >
            <input {...getInputProps()} />
            {file ? (
              <>
                <Typography variant="body2" gutterBottom>
                  File Selected:
                  {' '}
                  {file.name}
                </Typography>
                <Button variant="outlined" onClick={() => setFile(null)}>
                  Remove File
                </Button>
              </>
            ) : (
              <Typography variant="body2" color="textSecondary">
                Drag & drop a CSV file here, or click to select one.
              </Typography>
            )}
          </Box>
          <Button variant="contained" color="primary" onClick={handleUpload} fullWidth>
            Submit
          </Button>
        </>
        )}
      </Paper>
    </Container>
  );
}

export default DataImport;
