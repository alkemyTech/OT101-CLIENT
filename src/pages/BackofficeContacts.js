import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { getRequest, deleteRequest } from '../services/requestsHandlerService';
import EnhancedTable from '../components/EnhancedTable';
import {confirmAlert, basicAlert} from '../services/sweetAlertService'
import HeadCellsContacts from '../components/ScreenTables/HeadCellsContacts';

function createData(idKey, name, lastname, phone, email, message, createdAt, updatedAt) {
  return {
    idKey,
    name,
    lastname,
    phone,
    email,
    message,
    createdAt,
    updatedAt
  };
}

export default function BackofficeContacts() {
  const [dense, setDense] = React.useState(false);
  const [rows, setRows] = useState([]);

  const getRequestContacts = async () => {
    try{
      const data = await getRequest('/contacts');
      setRows(data.map( item => createData(item.id, item.name, item.lastname, item.phone, item.email, item.message, item.createdAt, item.updatedAt)))
    }
    catch (err) {
      console.log(err)
    }
  }
  
  useEffect(() => {
      getRequestContacts();
  }, [])

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const handleEdit = (selectedRows) => {
    console.log('Edit pressed!!', selectedRows);
  };

  const handleDelete = (selectedRows) => {
    confirmAlert('Eliminar este/os contactos?', 'Los contactos serán borrados permantemente', 'question')
    .then(result => {
      if(result.isConfirmed) {
        for (let i = 0; i < selectedRows.length; i++) {
          const contact = selectedRows[i];
          console.log(`Delete element number ${i}!!`, contact);
          deleteRequest(`/contact/${contact}`);
          basicAlert('Contacto/s eliminado/s exitosamente', '', 'success');
        }
        getRequestContacts();
      } else {
        basicAlert('Acción cancelada', '', 'error');
      }
    })
  };


  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTable
          title='Contactos'
          dense={dense}
          headCells={HeadCellsContacts}
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
