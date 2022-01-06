import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import FormControlLabel from '@mui/material/FormControlLabel';
import Modal from '@mui/material/Modal';
import Switch from '@mui/material/Switch';
import { deleteRequest, getRequest } from '../services/requestsHandlerService';
import HeadCellsNews from '../components/ScreenTables/headCellsNews';
import { confirmAlert, basicAlert } from '../services/sweetAlertService';
import EnhancedTable from '../components/EnhancedTable';
import NewsForm from '../components/NewsForm';

function createData(idKey, name, image, type, categoryId, createdAt, updatedAt) {
  return {
    idKey,
    name,
    image,
    type,
    categoryId,
    createdAt,
    updatedAt,
  };
}

export default function BackofficeNews() {
  const [dense, setDense] = React.useState(false);
  const [rows, setRows] = useState([]);
  const [rowSelected, setRowSelected] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const getRequestNews = async () => {
    try{
      const data = await getRequest('/news/backoffice');
      setRows(data.map( item => createData(item.id, item.name, item.image, item.type, item.categoryId, item.createdAt, item.updatedAt)))
    }
    catch (err) {
      console.log(err)
    }
  }
  
  useEffect(() => {
    getRequestNews();  
  }, [isFormOpen])

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const handleEdit = (selectedRows) => {
    setRowSelected(rows.find( r => r.idKey === selectedRows[0]))
    setIsFormOpen(true);
  };

  const handleDelete = (selectedRows) => {
    confirmAlert('Eliminar estas novedades?', 'Las novedades serán borradas permantemente', 'question')
    .then(result => {
      if(result.isConfirmed) {
        for (let i = 0; i < selectedRows.length; i++) {
          const entry = selectedRows[i];
          console.log(`Delete element number ${i}!!`, entry);
          deleteRequest(`/news/${entry}`);
          basicAlert('Novedades eliminadas exitosamente', '', 'success');
        }
        getRequestNews();
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
    getRequestNews();
    setRowSelected([]);
    handleFormClose();
  }

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
          <NewsForm
            maxWidth="sm"
            sx={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }} 
            open={isFormOpen} 
            news={rowSelected}
            onSuccess={doSuccess}
            onCancel={handleFormClose}
          />
      </Modal>
    </Box>
  );
}
