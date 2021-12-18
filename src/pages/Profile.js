import { Button, Container, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import EditUserForm from '../components/EditUserForm';
import { deleteAccount } from '../features/user/userSlice';
import { Modal } from '@mui/material';
import { useState } from 'react';

export default function Profile() {
  const user = useSelector((state) => state.user.data);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const dispatch = useDispatch();

  const handleEditProfile = () => setIsFormOpen(true);

  const handleDeleteAccount = () => {
    Swal.fire({
      title: '¿Estás seguro de que deseas borrar la cuenta?',
      showCancelButton: true,
      icon: 'warning',
      confirmButtonText: 'Borrar cuenta',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
    }).then((result) => {
      if (result.isConfirmed) dispatch(deleteAccount(user.id));
    });
  };

  const handleFormClose = () => setIsFormOpen(false);

  return (
    <Container
      maxWidth="sm"
      sx={{
        border: 1,
        padding:3,
        borderRadius: 0.5,
        borderColor: 'lightgrey',
        marginTop: 16,
      }}
    >
      <Box>
        <Typography variant="h4" component="h2" sx={{marginBottom: 2}}>
          Tu perfil
        </Typography>
        <Typography variant="subtitle1">Nombre: {user.firstName}</Typography>
        <Typography variant="subtitle1">Apellido: {user.lastName}</Typography>
        <Typography variant="subtitle1">Emai: {user.email}</Typography>
      </Box>

      <Box sx={{ marginTop: 4, gap: 2, display: 'flex' }}>
        <Button color="primary" variant="contained" onClick={handleEditProfile}>
          Editar perfil
        </Button>
        <Button color="error" variant="contained" onClick={handleDeleteAccount}>
          Borrar cuenta
        </Button>
      </Box>

      <Modal
        open={isFormOpen}
        onClose={handleFormClose}
        sx={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }}
      >
        <Container
          sx={{
            backgroundColor: 'white',
            borderRadius: 0.5,
            borderColor: 'lightgrey',
          }}
          maxWidth="sm"
        >
          <EditUserForm user={user}/>
        </Container>
      </Modal>
    </Container>
  );
}
