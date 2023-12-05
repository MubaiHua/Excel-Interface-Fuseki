import React, { useState, useEffect } from 'react';
import {
  Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography,
} from '@mui/material';
import {
  getFusekiDatasets, deleteDatabase,
} from '../Utils/FusekiAPI';

function Overview() {
  const [databaseList, setDatabaseList] = useState([]);

  useEffect(() => {
    getFusekiDatasets()
      .then((response) => {
        // console.log('API Response:', response);
        setDatabaseList(response);
      })
      .catch((err) => {
        console.error('Error fetching datasets:', err);
        alert('Failed to load datasets');
      });
  }, []);

  const handleDelete = (databaseName) => {
    deleteDatabase({ databaseName })
      .then(() => { alert('Delete successful'); })
      .catch(() => { alert('Fail to delete'); });
  };

  const handleExport = (databaseName) => {
    const APIEndpoint = String(process.env.REACT_APP_ENDPOINT).replace(':8000', ':3030');
    // Replace the port number in the APIEndpoint string
    // Construct the new URL
    const externalLink = `${APIEndpoint}/${databaseName}/data`;

    // Open a new window
    const newWindow = window.open();

    // Create a temporary anchor element in the new window
    const anchor = newWindow.document.createElement('a');

    // Set the anchor's href attribute to the external link
    anchor.href = externalLink;

    // Specify that the anchor should trigger a download
    anchor.download = `${databaseName}.ttl`;

    // Append the anchor to the new window's document
    newWindow.document.body.appendChild(anchor);

    // Programmatically trigger a click event on the anchor in the new window
    anchor.click();

    // Remove the anchor from the new window's document
    newWindow.document.body.removeChild(anchor);
  };

  return (
    <>
      <Typography variant="h5" align="left" style={{ padding: '20px', marginTop: '20px' }}>
        Overview
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Database Name</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {databaseList.map((database) => (
              <TableRow key={database}>
                <TableCell>{database}</TableCell>
                <TableCell>
                  <Button variant="outlined" color="secondary" onClick={() => handleDelete(database)}>
                    Delete
                  </Button>
                  <Button variant="outlined" color="primary" onClick={() => handleExport(database)}>
                    Export
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>

  );
}

export default Overview;
