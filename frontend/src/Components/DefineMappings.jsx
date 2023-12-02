import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Select,
  MenuItem,
  Grid,
} from '@mui/material';
import { getFusekiDatasets } from '../Utils/FusekiAPI';
import { MainContext } from '../MainContext';

function DefineMappings({ userID, userName }) {
  const [datasets, setDatasets] = useState([]);
  const [selectedDataset, setSelectedDataset] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    getFusekiDatasets()
      .then((response) => {
        console.log('API Response:', response);
        setDatasets(response);
      })
      .catch((err) => {
        console.error('Error fetching datasets:', err);
        setError('Failed to load datasets');
      });
    console.log(userID);
  }, [userID]);

  const handleDatasetChange = (event) => {
    setSelectedDataset(event.target.value);
  };

  if (error) {
    return (
      <div>
        Error:
        {error}
      </div>
    );
  }

  return (
    <Container style={{ height: '100vh', paddingTop: '0%', overflow: 'hidden' }}>
      <Typography variant="h3" align="center" gutterBottom>
        Welcome Mapping Administrator
        {' '}
        {userName}
      </Typography>
      <Typography variant="h4" align="center" gutterBottom>
        Please select the database you would like to access:
      </Typography>

      <Grid container style={{ height: '70%' }}>
        <Grid item xs={6} style={{ borderRight: '1px solid #ccc', padding: '10px' }}>
          <Typography variant="h5">Fuseki Datasets</Typography>
          <Select value={selectedDataset} onChange={handleDatasetChange} fullWidth>
            {datasets.map((dataset, index) => (
              <MenuItem key={index} value={dataset}>
                {dataset}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={6} style={{ padding: '10px' }}>
          {/* Add content for the right half of the page */}
        </Grid>
      </Grid>
    </Container>
  );
}

export default DefineMappings;
