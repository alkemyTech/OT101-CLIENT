import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { getRequest, deleteRequest } from '../services/requestsHandlerService';
import HeadCellsCategories from '../components/ScreenTables/headCellsCategories';
import EnhancedTable from '../components/EnhancedTable';
import {confirmAlert, basicAlert} from '../services/sweetAlertService'
import Modal from '@mui/material/Modal';
import CategoryForm from '../components/CategoryForm';

function createData(idKey, name, description, createdAt, updatedAt) {
  return {
    idKey,
    name,
    description,
    createdAt,
    updatedAt,
  };
}


export default function BackofficeCategories () {
  const [dense, setDense] = React.useState(false);
  const [rows, setRows] = useState([]);
  const [rowSelected, setRowSelected] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const getRequestCategories = async () => {
    try{
      const data = await getRequest('/categories');
      setRows(data.map( item => createData(item.id, item.name, item.description, item.createdAt, item.updatedAt)))
    }
    catch (err) {
      console.log(err)
    }
  }
  
  useEffect(() => {
      getRequestCategories();
  }, [])


  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const handleEdit = (selectedRows) => {
    setRowSelected(rows.find( r => r.idKey === selectedRows[0]))
    setIsFormOpen(true);
  };

  const handleDelete = (selectedRows) => {
    confirmAlert('Eliminar estas categorias?', 'Las cateogrías serán borradas permantemente', 'question')
    .then(result => {
      if(result.isConfirmed) {
        for (let i = 0; i < selectedRows.length; i++) {
          const category = selectedRows[i];
          console.log(`Delete element number ${i}!!`, category);
          deleteRequest(`/categories/${category}`);
          basicAlert('Categorias eliminadas exitosamente', '', 'success');
        }
        getRequestCategories();
      } else {
        basicAlert('Acción cancelada', '', 'error');
      }
    })
  };

  const handleFormOpen  = () => setIsFormOpen(true);
  const handleFormClose = () => {
    setRowSelected([]);
    setIsFormOpen(false)
  };

  const doSuccess = (item) => {
    getRequestCategories();
    setRowSelected([]);
    handleFormClose();
  }

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
          onCreate={handleFormOpen}

        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
      <Modal
        open={isFormOpen}
        onClose={handleFormClose}
      >
          <CategoryForm
            maxWidth="sm"
            sx={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }} 
            open={isFormOpen} 
            category={rowSelected}
            onSuccess={doSuccess}
            onCancel={handleFormClose}
          />
      </Modal>
    </Box>
  );
}
