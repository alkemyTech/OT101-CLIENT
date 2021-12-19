import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { getRequest, deleteRequest } from '../services/requestsHandlerService';
import HeadCellsCategories from '../components/ScreenTables/headCellsCategories';
import EnhancedTable from '../components/EnhancedTable';
import sweetAlertServices from '../services/sweetAlertServices'

function createData(idKey, name, description) {
  return {
    idKey,
    name,
    description,
  };
}

const sampleData = [
  createData(1, 'Nombre Uno', 'Descripción de nombre uno'),
  createData(2, 'Nombre Dos', 'Descripción de nombre dos'),
];


export default function BackofficeCategories () {
  const [dense, setDense] = React.useState(false);
  const [rows, setRows] = useState(sampleData);


  useEffect(() => {
      getRequest('http://localhost:3001/categories')
      .then( data => setRows(
        data.map( item => createData(item.id, item.name, item.description)
      ))
      )
      .catch(err => console.log(err))
  }, [rows])


  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const handleEdit = (selectedRows) => {
    console.log('Edit pressed!!', selectedRows);
  };

  const handleDelete = (selectedRows) => {
    for (let i = 0; i < selectedRows.length; i++) {
      const category = selectedRows[i];
      console.log(`Delete element number ${i}!!`, category);
      sweetAlertServices('confirm', 'Eliminando categoría', 'Categoría eliminada exitosamente');
      deleteRequest(`http://localhost:3001/categories/${category}`)
      getRequest('http://localhost:3001/categories')
        .then( data => setRows(
          data.map( item => createData(item.id, item.name, item.description)
        ))
        )
        .catch(err => console.log(err))
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTable
          title='Categorias'
          dense={dense}
          headCells={HeadCellsCategories}
          rows={rows}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
}