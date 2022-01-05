import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { deleteRequest, getRequest, patchRequest } from '../services/requestsHandlerService';
import HeadCellsActivities from '../components/ScreenTables/HeadCellsActivities';
import { confirmAlert, basicAlert } from '../services/sweetAlertService';
import EnhancedTable from '../components/EnhancedTable';
import { Modal, Container } from '@mui/material';
import ActivityForm from '../components/ActivityForm';
import FormStyles from '../styles/FormStyles';

function createData(idKey, name, image, content, createdAt, updatedAt) {
  return {
    idKey,
    name,
    image,
    content,
    createdAt,
    updatedAt
  };
}

export default function BackofficeActivities () {
  const [dense, setDense] = React.useState(false);
  const [rows, setRows] = useState([]);
  const [rowSelected, setRowSelected] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const getRequestActivities = async () => {
    try{
      setRows(data.map( item => createData(item.id, item.name, item.image, item.content, item.createdAt, item.updatedAt)))
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
    setRowSelected(rows.find( r => r.idKey === selectedRows[0]))
    setIsFormOpen(true);
  };
  
  const handleFormClose = () => setIsFormOpen(false);

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
      <Modal
        open={isFormOpen}
      >
          <ActivityForm
            maxWidth="sm"
            sx={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }} 
            open={isFormOpen} 
            activity={rowSelected}
            onSuccess={rowSelected}
            onCancel={handleFormClose} />
      </Modal>
    </Box>
  );
}
