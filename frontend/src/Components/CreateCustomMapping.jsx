import React, { useState, useEffect } from 'react';
import {
  Button, TextField, MenuItem, Container, TextareaAutosize, FormControl, InputLabel, Select,
} from '@mui/material';
import {
  checkDuplicateMappingName, getFusekiDatasets, createCustomMapping,
} from '../Utils/FusekiAPI';

/**
 * React component for creating a custom mapping.
 *
 * @component
 * @returns {JSX.Element} JSX.Element
 */
function CustomMapping() {
  /**
   * State variables for managing form inputs and errors
   */
  const [mappingName, setMappingName] = useState('');
  const [selectedDatabase, setSelectedDatabase] = useState('');
  const [sparqlCode, setSparqlCode] = useState('');
  const [duplicateNameError, setDuplicateNameError] = useState('');
  const [datasets, setDatasets] = useState([]);

  /**
   * Effect hook to fetch datasets when the component mounts.
   */
  useEffect(() => {
    getFusekiDatasets()
      .then((response) => {
        setDatasets(response);
      })
      .catch((err) => {
        console.error('Error fetching datasets:', err);
        setError('Failed to load datasets');
      })
      .finally(() => {
      });
  }, []);

  /**
   * Event handler for handling changes in the mapping name input.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event - The change event object.
   */
  const handleMappingNameChange = (event) => {
    setMappingName(event.target.value);
    setDuplicateNameError('');
  };

  /**
   * Event handler for handling changes in the database selection.
   *
   * @param {React.ChangeEvent<{ value: unknown }>} event - The change event object.
   */
  const handleDatabaseChange = (event) => {
    setSelectedDatabase(event.target.value);
  };

  /**
   * Event handler for handling changes in the SparQL code input.
   *
   * @param {React.ChangeEvent<HTMLTextAreaElement>} event - The change event object.
   */
  const handleSparqlCodeChange = (event) => {
    setSparqlCode(event.target.value);
  };

  /**
   * Event handler for handling form submission.
   */
  const handleSubmit = () => {
    checkDuplicateMappingName({ name: mappingName })
      .then((data) => {
        const { duplicate } = data;
        setDuplicateNameError(duplicate ? 'Mapping name already exists' : '');
      })
      .catch((err) => {
        console.error('Error checking duplicate name:', err);
        setDuplicateNameError('Error checking duplicate name');
      });

    if (!duplicateNameError) {
      const payload = {
        selectedDatabase,
        mappingName,
        sparqlCode,
      };

      createCustomMapping(payload)
        .then(() => {
          setSelectedDatabase('');
          setMappingName('');
          setSparqlCode('');
          alert('Successfully created mapping');
        })
        .catch((err) => {
          console.error('Error creating mapping:', err);
          alert('Fail to create mapping');
        });
    }
  };

  /**
   * JSX structure of the component.
   *
   * @returns {JSX.Element} JSX.Element
   */
  return (
    <Container>
      <TextField
        label="Mapping Name"
        variant="outlined"
        fullWidth
        value={mappingName}
        onChange={handleMappingNameChange}
        style={{ marginBottom: 16 }}
        error={!!duplicateNameError}
        helperText={duplicateNameError}
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

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={selectedDatabase === '' || mappingName === '' || sparqlCode === '' || !!duplicateNameError}
      >
        Submit
      </Button>
    </Container>
  );
}

export default CustomMapping;
