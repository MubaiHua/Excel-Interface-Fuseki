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
import { getFusekiDatasets } from '../Utils/FusekiAPI';

const steps = ['Select Database', 'Select Data Types', 'Select Attributes of the type'];

export default function DefineMappings({ userName, userID }) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const [datasets, setDatasets] = useState([]);
  const [selectedDataset, setSelectedDataset] = useState('');

  useEffect(() => {
    getFusekiDatasets()
      .then((response) => {
        console.log('API Response:', response);
        setDatasets(response);
      })
      .catch((err) => {
        console.error('Error fetching datasets:', err);
        alert('Failed to load datasets');
      });
    console.log(userID);
  }, [userID]);

  const handleDatasetChange = (event) => {
    setSelectedDataset(event.target.value);
  };

  const isStepOptional = (step) => step === 114514; // place holder for feature

  const isStepSkipped = (step) => skipped.has(step);

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>
            This is your query
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Create a new Mapping</Button>
          </Box>
        </>
      ) : (
        <>
          <Grid container style={{ height: '70%' }}>
            <Grid item xs={6} style={{ borderRight: '1px solid #ccc', padding: '10px' }}>
              <Typography variant="h4" align="center" gutterBottom>
                Please select the database you would like to access:
              </Typography>
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
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}

            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'View Your Query' : 'Next'}
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
}

DefineMappings.propTypes = {
  userID: PropTypes.number.isRequired,
  userName: PropTypes.string.isRequired,
};
