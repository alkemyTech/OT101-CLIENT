import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Modal from '@mui/material/Modal';
import { deleteRequest, getRequest } from '../services/requestsHandlerService';
import { confirmAlert, basicAlert } from '../services/sweetAlertService';
import EnhancedTable from '../components/EnhancedTable';
import HeadCellsTestimonials from '../components/ScreenTables/HeadCellsTestimonials';
import TestimonialForm from '../components/TestimonialForm';

function createData(idKey, name, content, image, createdAt, updatedAt) {
  return {
    idKey,
    name,
    content,
    image,
    createdAt,
    updatedAt
  };
}

export default function BackofficeTestimonials () {
  const [dense, setDense] = React.useState(false);
  const [rows, setRows] = useState([]);
  const [rowSelected, setRowSelected] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  const getRequestTestimonials = async () => {
    try{
      const data = await getRequest('/testimonials/backoffice');
      setRows(data.map( item => createData(item.id, item.name, item.content, item.image, item.createAt, item.updatedAt)))
    }
    catch (err) {
      console.log(err)
    }
  }
  
  useEffect(() => {
    getRequestTestimonials();  
  }, [])

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const handleEdit = (selectedRows) => {
    setRowSelected(rows.find( r => r.idKey === selectedRows[0]))
    setIsFormOpen(true);
  };

  const handleDelete = (selectedRows) => {
    confirmAlert('Eliminar estos testimonios?', 'Los testimonios serán borradas permantemente', 'question')
    .then(result => {
      if(result.isConfirmed) {
        for (let i = 0; i < selectedRows.length; i++) {
          const testimonial = selectedRows[i];
          console.log(`Delete element number ${i}!!`, testimonial);
          deleteRequest(`/testimonials/${testimonial}`);
          basicAlert('Testimonio eliminadas exitosamente', '', 'success');
        }
        getRequestTestimonials();
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
    getRequestTestimonials();
    setRowSelected([]);
    handleFormClose();
  }
  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTable
          title='Testimonios'
          dense={dense}
          headCells={HeadCellsTestimonials}
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
          <TestimonialForm
            maxWidth="sm"
            sx={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }} 
            open={isFormOpen} 
            testimonial={rowSelected}
            onCancel={handleFormClose}
            onSuccess={doSuccess}
            onFailure={handleFormClose}
          />
      </Modal>
    </Box>
  );
}
