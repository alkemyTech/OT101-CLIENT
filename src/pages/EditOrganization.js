import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { postRequest } from '../services/requestsHandlerService';
import Swal from 'sweetalert2';


const validationSchema = yup.object({
  name: yup
    .string()
    .required('Debe ingresar un nombre.')
    .max(250, 'Máximo 250 caracteres'),
  email: yup
    .string()
    .required('Debe ingresar un email.')
    .max(250, 'Maximo 250 caracteres')
    .email('Debe ingresar un email válido.'),
  phone: yup
    .string()
    .max(250, 'Maximo 250 caracteres'),
  message: yup
    .string()
    .required('Debe ingresar la consulta'),
});


const EditOrganization = () => {
  const urlSubmit = ''
  const doSubmit = (values, actions) => {
    const apiRequest = postRequest(urlSubmit, values);

    apiRequest.then(data => {
        /* Swal.fire('Contacto', 'Solicitud procesada correctamente', 'success'); */
        actions.resetForm();
      })
      .catch(err => {
        /* Swal.fire('Contacto', 'No se pudo procesar la solicitud', 'error'); */
      })
      .finally(() => actions.setSubmitting(false));
  };

  const { handleChange, handleSubmit, values, errors, isSubmitting } = useFormik({
    initialValues: {
      name: '',
      logo: ''
    },
    validationSchema: validationSchema,
    onSubmit: doSubmit,
    validateOnChange: false,
  });

  return (
    <Box sx={{ my: 'auto' }}>
      <Container maxWidth="md">
        <Box
          sx={{ border: 1, paddingX: 5, paddingY: 5, borderRadius: 0.5, borderColor: 'lightgrey' }}
          justifyContent="center"
        >
          <Typography variant="h5" component="h2" textAlign="left" fontWeight="bold" mb={6}>
            Edición Organización
          </Typography>
          <form onSubmit={handleSubmit} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  id="name"
                  name="name"
                  onChange={handleChange}
                  value={values.name}
                  label="Nombre"
                  fullWidth
                  error={Boolean(errors.name)}
                  helperText={errors.name}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="logo"
                  name="logo"
                  type="file"
                  onChange={handleChange}
                  value={values.logo}
                  label="logo"
                  fullWidth
                  error={Boolean(errors.logo)}
                  helperText={errors.logo}
                />
              </Grid>
              <Grid item>
                <Button variant="contained" fullWidth type="submit" disabled={isSubmitting}>
                { isSubmitting ? 'Enviando' : 'Enviar' }
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </Box>
  );
}

export default EditOrganization;