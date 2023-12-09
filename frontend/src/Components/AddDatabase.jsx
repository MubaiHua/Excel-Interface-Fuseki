import React, { useState, useCallback } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useDropzone } from 'react-dropzone';
import { addDatabaseFile } from '../Utils/FusekiAPI';

/**
 * React component for uploading a file to create a new database.
 *
 * @component
 * @returns {JSX.Element} JSX.Element
 */
function FileUpload() {
  /**
   * State variables for managing file-related data and form inputs.
   */
  const [selectedFile, setSelectedFile] = useState(null);
  const [databaseName, setDatabaseName] = useState('');
  const [hasSpaceInDatabaseName, setHasSpaceInDatabaseName] = useState(false);

  /**
   * Function to send file content to the server for database creation.
   *
   * @param {string} fileContent - The content of the uploaded file.
   * @returns {void}
   */
  const sendFileContent = async (fileContent) => {
    const requestData = {
      fileContent,
      databaseName,
    };

    try {
      const data = await addDatabaseFile(requestData);
      alert(`Successfully create database ${data.name}`);
    } catch (error) {
      console.error('Error:', error);
      alert('Please make sure the database name is unique, and the uploaded file format is correct');
    }
  };

  /**
   * Callback function for handling the file drop event.
   *
   * @param {File[]} acceptedFiles - The accepted files dropped into the drop zone.
   * @returns {void}
   */
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setSelectedFile(file);
    }
  }, []);

  /**
   * Function to handle form submission.
   *
   * @returns {void}
   */
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

  /**
   * Custom hook for handling drop zone functionality.
   */
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, maxFiles: 1 });

  /**
   * JSX structure of the component.
   *
   * @returns {JSX.Element} JSX.Element
   */
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
