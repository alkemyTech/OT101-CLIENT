import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { deleteRequest, getRequest } from '../services/requestsHandlerService';
import HeadCellsUsers from '../components/ScreenTables/HeadCellsUsers';
import { confirmAlert, basicAlert } from '../services/sweetAlertService';
import EnhancedTable from '../components/EnhancedTable';

function createData(idKey, firstName, lastName, email, image, roleId) {
  return {
    idKey,
    firstName,
    lastName,
    email,
    image,
    roleId
  };
}

export default function BackofficeUsers2 () {
  const [dense, setDense] = React.useState(false);
  const [rows, setRows] = useState([]);

  const getRequesUsers = async () => {
    const data = await getRequest('/users');
    try{
      setRows(data.map( item => createData(item.id, item.firstName, item.lastName, item.email, item.image, item.roleId)))
    }
    catch (err) {
      console.log(err)
    }
  }
  
  useEffect(() => {
    getRequesUsers();  
  }, [])

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const handleEdit = (selectedRows) => {
    console.log('Edit pressed!!', selectedRows);
  };

  const handleDelete = (selectedRows) => {
    confirmAlert('Eliminar estos usuarios?', 'Los usuarios serán borradas permantemente', 'question')
    .then(result => {
      if(result.isConfirmed) {
        for (let i = 0; i < selectedRows.length; i++) {
          const user = selectedRows[i];
          console.log(`Delete element number ${i}!!`, user);
          deleteRequest(`/users/${user}`);
          basicAlert('Usuarios eliminados exitosamente', '', 'success');
        }
        getRequesUsers();
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
          headCells={HeadCellsUsers}
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
