import React, { useState, useEffect } from 'react';
import {
  Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography,
} from '@mui/material';
import {
  getFusekiDatasets, deleteDatabase,
} from '../Utils/FusekiAPI';

/**
 * React component for displaying an overview of databases.
 * @component
 * @returns {JSX.Element} Overview component.
 */
function Overview() {
  const [databaseList, setDatabaseList] = useState([]);

  /**
   * Fetches Fuseki datasets on component mount.
   */
  useEffect(() => {
    getFusekiDatasets()
      .then((response) => {
        setDatabaseList(response);
      })
      .catch((err) => {
        console.error('Error fetching datasets:', err);
        alert('Failed to load datasets');
      });
  }, []);

  /**
   * Handles the delete action for a database.
   * @param {string} databaseName - The name of the database to delete.
   */
  const handleDelete = (databaseName) => {
    deleteDatabase({ databaseName })
      .then(() => { alert('Delete successful'); })
      .catch(() => { alert('Fail to delete'); });
  };

  /**
   * Handles the export action for a database.
   * @param {string} databaseName - The name of the database to export.
   */
  const handleExport = (databaseName) => {
    const APIEndpoint = String(process.env.REACT_APP_ENDPOINT).replace(':8000', ':3030');
    const externalLink = `${APIEndpoint}/${databaseName}/data`;

    const newWindow = window.open();
    const anchor = newWindow.document.createElement('a');
    anchor.href = externalLink;
    anchor.download = `${databaseName}.ttl`;

    newWindow.document.body.appendChild(anchor);
    anchor.click();
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
