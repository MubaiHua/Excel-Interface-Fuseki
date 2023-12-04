/* eslint-disable no-nested-ternary */
import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  Box, Typography, Button, Container, Grid, MenuItem, Paper, Select,
} from '@mui/material';
import {
  getAllDatabase, getAllMappings, getAllExports, postImportExcel,
} from '../Utils/FusekiAPI';

function DataImport() {
  const [file, setFile] = useState(null);
  const [database, setDatabase] = useState('');
  const [mapping, setMapping] = useState('');
  const [exportValue, setExportValue] = useState('');
  const [csvData, setCSVData] = useState(null);
  const [allDatabase, setAllDatabase] = useState([]);
  const [allMappings, setAllMappings] = useState([]);
  const [allExportValue, setAllExportValue] = useState([]);

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
      getAllExports({ mappingID: mapping })
        .then((data) => {
          setAllExportValue(data);
        }).catch(() => {
          alert('Fail to get export data');
        });
    }
  }, [mapping]);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const fileContent = event.target.result;
        // Update the state with the parsed data
        setCSVData(fileContent);
      };
      reader.readAsText(acceptedFiles[0]);
      setFile(acceptedFiles[0]);
    }
  }, []);
  const handleDatabaseChange = (event) => {
    setDatabase(event.target.value);
  };

  const handleMappingChange = (event) => {
    setMapping(event.target.value);
  };

  const handleExportChange = (event) => {
    setExportValue(event.target.value);
  };

  const handleUpload = async () => {
    let dbName = '';
    for (let i = 0; i < allDatabase.length; i++) {
      if (allDatabase[i].id === database) {
        dbName = allDatabase[i].name;
        break;
      }
    }
    if (dbName === '') {
      alert('Fail to import');
      return;
    }
    const payload = {
      dbName,
      csvData,
      exportValue,
    };
    postImportExcel(payload)
      .then((data) => console.log(data))
      .catch(() => alert('Fail to import'));
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
            <Grid item xs={12}>
              <Select
                value={exportValue}
                onChange={handleExportChange}
                fullWidth
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
              >
                <MenuItem value="" disabled>
                  Select Export ID
                </MenuItem>
                {allExportValue.map((mp) => (<MenuItem value={mp.id}>{mp.id}</MenuItem>))}
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
          <Button variant="contained" color="primary" onClick={handleUpload} fullWidth disabled={mapping === '' || database === '' || exportValue === ''}>
            Submit
          </Button>
        </>
        )}
      </Paper>
    </Container>
  );
}

export default DataImport;
