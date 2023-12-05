import React, { useState } from 'react';
import {
  Button, TextField, MenuItem, Container, TextareaAutosize, FormControl, InputLabel, Select,
} from '@mui/material';

function CustomMapping() {
  const [mappingName, setMappingName] = useState('');
  const [selectedDatabase, setSelectedDatabase] = useState('');
  const [sparqlCode, setSparqlCode] = useState('');

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
    // Add your submit logic here
    console.log('Mapping Name:', mappingName);
    console.log('Selected Database:', selectedDatabase);
    console.log('SparQL Code:', sparqlCode);
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
      />

      <FormControl variant="outlined" fullWidth style={{ marginBottom: 16 }}>
        <InputLabel id="database-label">Database</InputLabel>
        <Select
          label="Database"
          labelId="database-label"
          value={selectedDatabase}
          onChange={handleDatabaseChange}
        >
          <MenuItem value="database1">Database 1</MenuItem>
          <MenuItem value="database2">Database 2</MenuItem>
          {/* Add more databases as needed */}
        </Select>
      </FormControl>

      <TextareaAutosize
        minRows={8}
        placeholder="Enter SparQL code here..."
        style={{ width: '100%', marginBottom: 16 }}
        value={sparqlCode}
        onChange={handleSparqlCodeChange}
      />

      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </Container>
  );
}

export default CustomMapping;
