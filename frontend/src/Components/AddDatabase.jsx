/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useCallback } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useDropzone } from 'react-dropzone';
import { addDatabaseFile } from '../Utils/FusekiAPI';

function FileUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [databaseName, setDatabaseName] = useState('');
  const [hasSpaceInDatabaseName, setHasSpaceInDatabaseName] = useState(false);
  // const [graphName, setGraphName] = useState('');

  const sendFileContent = async (fileContent) => {
    const requestData = {
      fileContent,
      databaseName,
    };

    addDatabaseFile(requestData)
      .then((data) => {
        alert(`Successfully create database ${data.name}`);
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Please make sure database name is unique, and the uploaded file format is correct');
      });
  };

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setSelectedFile(file);
    }
  }, []);

  const handleSubmit = async () => {
    // Check if a file has been selected
    if (!selectedFile) {
      return;
    }

    // Read the content of the file as text
    const reader = new FileReader();
    reader.onload = (event) => {
      const fileContent = event.target.result;

      // Send the file content as a string to the server or perform additional processing
      sendFileContent(fileContent);
    };
    reader.readAsText(selectedFile);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, maxFiles: 1 });

  return (
    <div>
      <Typography variant="h4" sx={{ marginBottom: '16px' }}>
        Creating a new database
      </Typography>

      <Typography variant="h6" sx={{ marginBottom: '8px' }}>
        Please upload your text file
      </Typography>

      <TextField
        label="Database Name"
        variant="outlined"
        margin="normal"
        fullWidth
        value={databaseName}
        onChange={(e) => {
          setDatabaseName(e.target.value);
          // Check if the updated databaseName contains a space
          setHasSpaceInDatabaseName(e.target.value.includes(' '));
        }}
        error={hasSpaceInDatabaseName}
        helperText={hasSpaceInDatabaseName ? 'Database name should not contain spaces' : ''}
      />
      {/* <TextField
        label="Graph Name"
        variant="outlined"
        margin="normal"
        fullWidth
        value={graphName}
        onChange={(e) => setGraphName(e.target.value)}
      /> */}

      <Box
        {...getRootProps()}
        sx={{
          border: `2px dashed ${isDragActive ? '#3f51b5' : '#c7c7c7'}`,
          borderRadius: '4px',
          padding: '16px',
          textAlign: 'center',
          cursor: 'pointer',
          marginTop: '16px',
        }}
      >
        <input {...getInputProps()} />
        <CloudUploadIcon sx={{ fontSize: 48, color: isDragActive ? '#3f51b5' : 'inherit' }} />
        <p>{isDragActive ? 'Drop the file here' : 'Drag and drop a file here or click to select'}</p>
      </Box>

      {selectedFile && (
      <p>
        Selected File:
        {selectedFile.name}
      </p>
      )}

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={!selectedFile || !databaseName || hasSpaceInDatabaseName}
        sx={{ marginTop: '16px' }}
      >
        Submit
      </Button>
    </div>
  );
}

export default FileUpload;
