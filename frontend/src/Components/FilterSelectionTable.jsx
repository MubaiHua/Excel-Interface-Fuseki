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

/**
 * React component for a dynamic table with predicate and text input fields.
 * @component
 * @param {Object} props - The component props.
 * @param {string[]} props.allPredicates - An array of available predicates for selection.
 * @param {function} props.onDataUpdate - A callback function to handle data updates.
 * @returns {JSX.Element} MyTable component.
 */
function MyTable({ allPredicates, onDataUpdate }) {
  const theme = useTheme();
  const [data, setData] = useState([]);

  /**
   * Handles changes in the selected predicate for a specific row.
   * @param {number} index - The index of the row in the data array.
   * @param {string} value - The selected predicate value.
   */
  const handlePredicateChange = (index, value) => {
    const newData = [...data];
    newData[index].predicate = value;
    setData(newData);
    onDataUpdate(newData); // Call the callback with updated data
  };

  /**
   * Handles changes in the text input for a specific row.
   * @param {number} index - The index of the row in the data array.
   * @param {string} value - The text input value.
   */
  const handleTextChange = (index, value) => {
    const newData = [...data];
    newData[index].text = value;
    setData(newData);
    onDataUpdate(newData); // Call the callback with updated data
  };

  /**
   * Adds a new row to the table.
   */
  const handleAddRow = () => {
    const newData = [...data, { predicate: '', text: '' }];
    setData(newData);
    onDataUpdate(newData); // Call the callback with updated data
  };

  /**
   * Deletes a row from the table.
   * @param {number} index - The index of the row to be deleted.
   */
  const handleDeleteRow = (index) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
    onDataUpdate(newData); // Call the callback with updated data
  };

  /**
   * Trigger the callback when the component mounts and whenever the data changes.
   */
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
