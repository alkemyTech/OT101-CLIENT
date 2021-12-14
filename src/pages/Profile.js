import { Button, Container, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { deleteAccount, editProfile } from '../features/user/userSlice';

export default function Profile() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleEditProfile = () => {
    //Vincular con el formulario de edición de usuario (57)
  };

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

  return (
    <Container
      maxWidth="sm"
      sx={{ border: 1, paddingX: 5, paddingY: 5, borderRadius: 0.5, borderColor: 'lightgrey', marginTop: 16 }}
    >
      <Box>
        <Typography variant="h5" component="h2">
          {user.firstName} {user.lastName}
        </Typography>
        <Typography variant="subtitle1">{user.email}</Typography>
      </Box>
      <Box sx={{ marginTop: 4, gap: 2, display: 'flex' }}>
        <Button color="primary" variant="contained" onClick={handleEditProfile}>
          Editar perfil
        </Button>
        <Button color="error" variant="contained" onClick={handleDeleteAccount}>
          Borrar cuenta
        </Button>
      </Box>
    </Container>
  );
}
