/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import {
  Button, TextField, MenuItem, Container, TextareaAutosize, FormControl, InputLabel, Select,
} from '@mui/material';
import {
  checkDuplicateMappingName, getFusekiDatasets, createCustomMapping,
} from '../Utils/FusekiAPI';

function CustomMapping() {
  const [mappingName, setMappingName] = useState('');
  const [selectedDatabase, setSelectedDatabase] = useState('');
  const [sparqlCode, setSparqlCode] = useState('');
  const [dupliacateNameError, setDupliacateNameError] = useState('');
  const [datasets, setDatasets] = useState([]);

  useEffect(() => {
    getFusekiDatasets()
      .then((response) => {
        // console.log('API Response:', response);
        setDatasets(response);
      })
      .catch((err) => {
        console.error('Error fetching datasets:', err);
        alert('Failed to load datasets');
      });
  }, []);

  useEffect(() => {
    setDupliacateNameError('');
  }, [mappingName]);

  const handleMappingNameChange = (event) => {
    setMappingName(event.target.value);
  };

  const handleDatabaseChange = (event) => {
    setSelectedDatabase(event.target.value);
  };

  const handleSparqlCodeChange = (event) => {
    setSparqlCode(event.target.value);
  };

  const handleSubmit = () => {
    checkDuplicateMappingName({ name: mappingName })
      .then((data) => {
        const { duplicate } = data;
        if (duplicate) {
          setDupliacateNameError('Mapping name already exist');
        } else {
          setDupliacateNameError('');
        }
      });
    if (dupliacateNameError === '') {
      const payload = {
        selectedDatabase, mappingName, sparqlCode,
      };
      createCustomMapping(payload)
        .then(() => {
          setSelectedDatabase('');
          setMappingName('');
          setSparqlCode('');
          alert('Successfully created mapping');
        }).catch(() => {
          alert('Fail to create mapping');
        });
    }
  };

  return (
    <Container>
      <TextField
        label="Mapping Name"
        variant="outlined"
        fullWidth
        value={mappingName}
        onChange={handleMappingNameChange}
        style={{ marginBottom: 16 }}
        error={!!dupliacateNameError}
        helperText={dupliacateNameError}
      />

      <FormControl variant="outlined" fullWidth style={{ marginBottom: 16 }}>
        <InputLabel id="database-label">Database</InputLabel>
        <Select value={selectedDatabase} onChange={handleDatabaseChange} fullWidth>
          {datasets.map((dataset) => (
            <MenuItem key={dataset} value={dataset}>
              {dataset}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextareaAutosize
        minRows={8}
        placeholder="Enter SparQL code here..."
        style={{ width: '100%', marginBottom: 16 }}
        value={sparqlCode}
        onChange={handleSparqlCodeChange}
      />

      <Button variant="contained" color="primary" onClick={handleSubmit} disabled={selectedDatabase === '' || mappingName === '' || sparqlCode === ''}>
        Submit
      </Button>
    </Container>
  );
}

export default CustomMapping;
