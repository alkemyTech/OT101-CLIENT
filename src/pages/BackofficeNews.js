import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { deleteRequest, getRequest } from '../services/requestsHandlerService';
import HeadCellsNews from '../components/ScreenTables/headCellsNews';
import { confirmAlert, basicAlert } from '../services/sweetAlertService';
import EnhancedTable from '../components/EnhancedTable';

function createData(id, name, image, type, categoryId, createdAt, updatedAt, deletedAt) {
  return {
    id,
    name,
    image,
    type,
    categoryId,
    createdAt,
    updatedAt,
    deletedAt
  };
}

export default function BackofficeNews() {
  const [dense, setDense] = React.useState(false);
  const [rows, setRows] = useState([]);

  const getRequestNews = async () => {
    const data = await getRequest('/news/backoffice');
    try{
      setRows(data.map( item => createData(item.id, item.name, item.image, item.type, item.categoryId, item.createAt, item.updatedAt, item.deletedAt)))
    }
    catch (err) {
      console.log(err)
    }
  }
  
  useEffect(() => {
    getRequestNews();  
  }, [])

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const handleEdit = (selectedRows) => {
    console.log('Edit pressed!!', selectedRows);
  };

  const handleDelete = (selectedRows) => {
    confirmAlert('Eliminar estas novedades?', 'Las novedades serán borradas permantemente', 'question')
    .then(result => {
      if(result.isConfirmed) {
        for (let i = 0; i < selectedRows.length; i++) {
          const entry = selectedRows[i];
          console.log(`Delete element number ${i}!!`, entry);
          deleteRequest(`/members/${entry}`);
          basicAlert('Novedades eliminadas exitosamente', '', 'success');
        }
        getRequestNews();
      } else {
        basicAlert('Acción cancelada', '', 'error');
      }
    })
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTable
          title='Novedades'
          dense={dense}
          headCells={HeadCellsNews}
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
