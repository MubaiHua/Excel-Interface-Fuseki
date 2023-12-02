/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useCallback } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

export default function AddDatabase() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [databaseName, setDatabaseName] = useState('');
  const [graphName, setGraphName] = useState('');

  const readBinaryFile = (file, callback) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const arrayBuffer = event.target.result;
      const dataView = new DataView(arrayBuffer);

      // Assuming your binary file has a specific structure, you need to implement your own logic to parse it
      // This is just a placeholder example, adjust it based on the actual structure of your binary data
      for (let i = 0; i < dataView.byteLength; i += 8) {
        const line = dataView.getFloat64(i); // Adjust the method based on your data type
        callback(line.toString()); // Convert each line to a string and send it to the callback
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setSelectedFile(file);

      // Read the binary file line by line
      readBinaryFile(file, (line) => {
        // Process each line as needed
        console.log('Parsed line:', line);

        // You can send each line to the server or perform additional processing
      });
    }
  }, []);

  const handleSubmit = async () => {
    // Perform the API call using Axios
    try {
      // Prepare the data to be sent to the server
      const requestData = {
        fileContent: selectedFile, // Assuming selectedFile contains the binary file
        databaseName,
        graphName,
      };

      // Replace 'your-api-endpoint' with the actual endpoint
      const response = await axios.post('your-api-endpoint', requestData);

      // Handle the response as needed
      console.log('API Response:', response.data);
    } catch (error) {
      // Handle errors
      console.error('Error:', error);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, maxFiles: 1 });

  return (
    <div>
      <Typography variant="h4" sx={{ marginBottom: '16px' }}>
        Creating a new database
      </Typography>

      <Typography variant="h6" sx={{ marginBottom: '8px' }}>
        Please upload your binary file
      </Typography>

      <TextField
        label="Database Name"
        variant="outlined"
        margin="normal"
        fullWidth
        value={databaseName}
        onChange={(e) => setDatabaseName(e.target.value)}
      />
      <TextField
        label="Graph Name"
        variant="outlined"
        margin="normal"
        fullWidth
        value={graphName}
        onChange={(e) => setGraphName(e.target.value)}
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
        disabled={!selectedFile || !databaseName || !graphName}
        sx={{ marginTop: '16px' }}
      >
        Submit
      </Button>
    </div>
  );
}
