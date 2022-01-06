import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Modal from '@mui/material/Modal';
import { deleteRequest, getRequest } from '../services/requestsHandlerService';
import HeadCellsUsers from '../components/ScreenTables/HeadCellsUsers';
import { confirmAlert, basicAlert } from '../services/sweetAlertService';
import EnhancedTable from '../components/EnhancedTable';
import EditUserForm from '../components/EditUserForm';

function createData(idKey, firstName, lastName, email, image, roleId, createdAt, updatedAt) {
  return {
    idKey,
    firstName,
    lastName,
    email,
    image,
    roleId,
    createdAt,
    updatedAt
  };
}

export default function BackofficeUsers2 () {
  const [dense, setDense] = React.useState(false);
  const [rows, setRows] = useState([]);
  const [rowSelected, setRowSelected] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const getRequesUsers = async () => {
    try{
      const data = await getRequest('/users');
      setRows(data.map( item => createData(item.id, item.firstName, item.lastName, item.email, item.image, item.roleId, item.createdAt, item.updatedAt)))
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
    setRowSelected(rows.find( r => r.idKey === selectedRows[0]))
    setIsFormOpen(true);
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
          title='Usuarios'
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
      <Modal
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
      >
        <EditUserForm
            maxWidth="sm"
            sx={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }} 
            open={isFormOpen} 
            user={rowSelected}
            backOffice={true}
        />
      </Modal>

    </Box>
  );
}
