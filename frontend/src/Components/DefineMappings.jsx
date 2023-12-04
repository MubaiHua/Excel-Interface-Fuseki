/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import PropTypes from 'prop-types';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import StorageIcon from '@mui/icons-material/Storage';

import {
  getFusekiDatasets, getDatabaseTypes, getTypePredicates, generateQuery,
} from '../Utils/FusekiAPI';

const steps = ['Select Database', 'Select Data Types', 'Select Attributes of the type'];

function FinishedItem({ finishedList }) {
  return (
    <List sx={{ width: '100%', fullWidth: true }}>
      {finishedList.map((item) => (
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <StorageIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={item.name} secondary={item.name} />
        </ListItem>
      ))}
    </List>
  );
}

FinishedItem.propTypes = {
  finishedList: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default function DefineMappings({ userName, userID }) {
  const [activeStep, setActiveStep] = useState(0);

  const [datasets, setDatasets] = useState([]);
  const [selectedDatabase, setSelectedDatabase] = useState('');
  // all the types the dataset contains
  const [dataTypes, setDataTypes] = useState([]);
  // type selected by the users
  const [selectedType, setSelectedType] = useState('');

  // all the predicates related to the data type selected
  const [predicates, setPredicates] = useState([]);
  // predicates selected by the users
  const [selectedPredicates, setSelectedPredicates] = useState([]);
  const [generatedQuery, setGeneratedQuery] = useState([]);

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
    console.log(userID);
  }, [userID]);

  const handleDatasetChange = (event) => {
    setSelectedDatabase(event.target.value);
    setSelectedType(''); // clean selected type if user goes back from the second step
    setSelectedPredicates([]); // clean selected type if user goes back from the third step
  };

  const handleTypeSelectionChange = (event) => {
    setSelectedType(event.target.value);
    setSelectedPredicates([]);// clean selected type if user goes back from the third step
  };

  const handlePredicatesSelectionChange = (event) => {
    setSelectedPredicates(event.target.value);
  };

  const handleNext = () => {
    if (activeStep === 0) { // After selecting a dataset
      getDatabaseTypes(selectedDatabase)
        .then((response) => {
          setDataTypes(response);
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        })
        .catch((error) => {
          console.error('Error fetching data types:', error);
          alert("Can't fetching data types");
        });
    } else if (activeStep === 1) { // Moving from the second to the third step
      getTypePredicates(selectedDatabase, selectedType)
        .then((response) => {
          setPredicates(response);
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        })
        .catch((error) => {
          console.error('Error fetching predicates:', error);
          alert("Can't fetching predicates");
        });
    } else if (activeStep === 2) { // Moving from the second to the third step
      const data = {
        dbName: selectedDatabase,
        selectedType,
        selectedPredicates,
      };
      generateQuery(data)
        .then((response) => {
          console.log(response);
          const queryLines = response.query.split('\n');
          setGeneratedQuery(queryLines);
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        })
        .catch((error) => {
          console.error('Error generating query:', error);
          alert("Can't generate query");
        });
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setSelectedDatabase('');
    setSelectedType('');
    setSelectedPredicates([]);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === 0 && (
        <Grid container style={{ height: '100%' }}>
          <Grid item xs={6} style={{ borderRight: '1px solid #ccc', padding: '10px' }}>
            <Typography variant="h6" align="center" gutterBottom>
              Please select the database you would like to access:
            </Typography>
            <Select value={selectedDatabase} onChange={handleDatasetChange} fullWidth>
              {datasets.map((dataset, index) => (
                <MenuItem key={index} value={dataset}>
                  {dataset}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>
      )}

      {activeStep === 1 && (
        <Grid container style={{ height: '100%' }}>
          <Grid item xs={6} style={{ borderRight: '1px solid #ccc', padding: '10px' }}>
            <Typography variant="h6" align="center" gutterBottom>
              Please select your targeted data type
            </Typography>
            <Select
              value={selectedType}
              onChange={handleTypeSelectionChange}
              fullWidth
            >
              {dataTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={6} style={{ padding: '10px' }}>
            <FinishedItem finishedList={[{ type: 'Database', name: selectedDatabase }]} />
          </Grid>
        </Grid>
      )}

      {activeStep === 2 && (
        <Grid container style={{ height: '100%' }}>
          <Grid item xs={6} style={{ borderRight: '1px solid #ccc', padding: '10px' }}>
            <Typography variant="h6" align="center" gutterBottom>
              Please select attributes related to the selected data type
            </Typography>
            <Select
              multiple
              value={selectedPredicates}
              onChange={handlePredicatesSelectionChange}
              renderValue={(selected) => selected.join(', ')}
              fullWidth
            >
              {predicates.map((predicate) => (
                <MenuItem key={predicate} value={predicate}>
                  <Checkbox checked={selectedPredicates.indexOf(predicate) > -1} />
                  {predicate}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={6} style={{ padding: '10px' }}>
            <FinishedItem finishedList={[{ type: 'Database', name: selectedDatabase }, { type: 'Targeted Data Type', name: dataTypes }]} />
          </Grid>
        </Grid>
      )}

      {activeStep === steps.length && (
        <div>
          <Typography variant="subtitle1" gutterBottom style={{ paddingTop: '20px' }}>
            This is your mapping query
          </Typography>
          <Box
            bgcolor="black"
            color="white"
            borderRadius={4}
            p={2}
          >
            <Typography variant="body2" component="pre">
              {generatedQuery.map((line, index) => (
                <div key={index}>{line}</div>
              ))}
            </Typography>
          </Box>
        </div>
      )}
      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
        <Button
          color="inherit"
          disabled={activeStep === 0 || activeStep === steps.length}
          onClick={handleBack}
          sx={{ mr: 1 }}
        >
          Back
        </Button>
        <Box sx={{ flex: '1 1 auto' }} />
        {activeStep === steps.length ? (
          <Button color="primary" onClick={handleReset}>
            Create Another Mapping
          </Button>
        ) : (
          <Button
            onClick={handleNext}
            disabled={
                (activeStep === 0 && !selectedDatabase)
                 || (activeStep === 1 && !selectedType)
              }
          >
            {activeStep === steps.length - 1 ? 'View Your Query' : 'Next'}
          </Button>
        )}
      </Box>
    </Box>
  );
}

DefineMappings.propTypes = {
  userID: PropTypes.number.isRequired,
  userName: PropTypes.string.isRequired,
};
