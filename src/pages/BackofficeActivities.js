import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { deleteRequest, getRequest } from '../services/requestsHandlerService';
import HeadCellsActivities from '../components/ScreenTables/HeadCellsActivities';
import { confirmAlert, basicAlert } from '../services/sweetAlertService';
import EnhancedTable from '../components/EnhancedTable';

function createData(idKey, name, image, content) {
  return {
    idKey,
    name,
    image,
    content
  };
}

export default function BackofficeActivities () {
  const [dense, setDense] = React.useState(false);
  const [rows, setRows] = useState([]);

  const getRequestActivities = async () => {
    try{
      const data = await getRequest('/activities/backoffice');
      setRows(data.map( item => createData(item.id, item.name, item.image, item.content, item.deletedAt)))
    }
    catch (err) {
      console.log(err)
    }
  }
  
  useEffect(() => {
    getRequestActivities();  
  }, [])

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const handleEdit = (selectedRows) => {
    console.log('Edit pressed!!', selectedRows);
  };

  const handleDelete = (selectedRows) => {
    confirmAlert('Eliminar estas actividades?', 'Las actividades serán borradas permantemente', 'question')
    .then(result => {
      if(result.isConfirmed) {
        for (let i = 0; i < selectedRows.length; i++) {
          const activity = selectedRows[i];
          console.log(`Delete element number ${i}!!`, activity);
          deleteRequest(`/activities/${activity}`);
          basicAlert('Actividades eliminadas exitosamente', '', 'success');
        }
        getRequestActivities();
      } else {
        basicAlert('Acción cancelada', '', 'error');
      }
    })
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTable
          title='Actividades'
          dense={dense}
          headCells={HeadCellsActivities}
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
