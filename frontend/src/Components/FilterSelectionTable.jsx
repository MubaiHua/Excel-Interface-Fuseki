import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  useTheme,
} from '@mui/material';

function MyTable({ allPredicates, onDataUpdate }) {
  const theme = useTheme();
  const [data, setData] = useState([]);

  const handlePredicateChange = (index, value) => {
    const newData = [...data];
    newData[index].predicate = value;
    setData(newData);
    onDataUpdate(newData); // Call the callback with updated data
  };

  const handleTextChange = (index, value) => {
    const newData = [...data];
    newData[index].text = value;
    setData(newData);
    onDataUpdate(newData); // Call the callback with updated data
  };

  const handleAddRow = () => {
    const newData = [...data, { predicate: '', text: '' }];
    setData(newData);
    onDataUpdate(newData); // Call the callback with updated data
  };

  const handleDeleteRow = (index) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
    onDataUpdate(newData); // Call the callback with updated data
  };

  // Trigger the callback when the component mounts
  useEffect(() => {
    onDataUpdate(data);
  }, [data, onDataUpdate]);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell
              style={{
                color: theme.palette.primary.main,
                padding: '8px',
                border: `1px solid ${theme.palette.primary.main}`,
                backgroundColor: 'transparent',
              }}
            >
              Predicate
            </TableCell>
            <TableCell
              style={{
                color: theme.palette.primary.main,
                padding: '8px',
                border: `1px solid ${theme.palette.primary.main}`,
                backgroundColor: 'transparent',
              }}
            >
              Text
            </TableCell>
            <TableCell
              style={{
                color: theme.palette.primary.main,
                padding: '8px',
                border: `1px solid ${theme.palette.primary.main}`,
                backgroundColor: 'transparent',
              }}
            >
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell>
                <FormControl fullWidth>
                  <InputLabel>Select Predicate</InputLabel>
                  <Select
                    value={row.predicate}
                    onChange={(e) => handlePredicateChange(index, e.target.value)}
                  >
                    {allPredicates.map((predicate, index) => (
                      <MenuItem key={index} value={predicate}>
                        {predicate}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </TableCell>
              <TableCell>
                <TextField
                  fullWidth
                  value={row.text}
                  onChange={(e) => handleTextChange(index, e.target.value)}
                />
              </TableCell>
              <TableCell>
                <Button variant="outlined" color="secondary" onClick={() => handleDeleteRow(index)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button variant="outlined" color="primary" onClick={handleAddRow}>
        Add Row
      </Button>
    </TableContainer>
  );
}

MyTable.propTypes = {
  allPredicates: PropTypes.arrayOf(PropTypes.string).isRequired,
  onDataUpdate: PropTypes.func.isRequired,
};

export default MyTable;
