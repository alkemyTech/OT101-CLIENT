import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { deleteRequest, getRequest } from '../services/requestsHandlerService';
import HeadCellsMembers from '../components/ScreenTables/HeadCellsMembers';
import { confirmAlert, basicAlert } from '../services/sweetAlertService';
import EnhancedTable from '../components/EnhancedTable';

function createData(idKey, firstName, lastName, image) {
  return {
    idKey,
    firstName,
    lastName,
    image
  };
}

export default function BackofficeMembers () {
  const [dense, setDense] = React.useState(false);
  const [rows, setRows] = useState([]);

  const getRequestMembers = async () => {
    try{
      const data = await getRequest('/members');
      setRows(data.map( item => createData(item.id, item.firstName, item.lastName, item.image)))
    }
    catch (err) {
      console.log(err)
    }
  }
  
  useEffect(() => {
    getRequestMembers();  
  }, [])

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const handleEdit = (selectedRows) => {
    console.log('Edit pressed!!', selectedRows);
  };

  const handleDelete = (selectedRows) => {
    confirmAlert('Eliminar estos miembros?', 'Las miembros serán borradas permantemente', 'question')
    .then(result => {
      if(result.isConfirmed) {
        for (let i = 0; i < selectedRows.length; i++) {
          const member = selectedRows[i];
          console.log(`Delete element number ${i}!!`, member);
          deleteRequest(`/members/${member}`);
          basicAlert('Miembros eliminadas exitosamente', '', 'success');
        }
        getRequestMembers();
      } else {
        basicAlert('Acción cancelada', '', 'error');
      }
    })
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTable
          title='Miembros'
          dense={dense}
          headCells={HeadCellsMembers}
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
