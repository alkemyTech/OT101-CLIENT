import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import { postRequest } from '../services/requestsHandlerService';
import Swal from 'sweetalert2';

const validationSchema = yup.object({
  name: yup.string().required('Debe ingresar un nombre.').max(250, 'Máximo 250 caracteres'),
  email: yup
    .string()
    .required('Debe ingresar un email.')
    .max(250, 'Maximo 250 caracteres')
    .email('Debe ingresar un email válido.'),
  phone: yup.string().max(250, 'Maximo 250 caracteres'),
  message: yup.string().required('Debe ingresar la consulta'),
});

const Contact = () => {
  const doSubmit = (values, actions) => {
    const apiRequest = postRequest('/contacts', values);

    apiRequest
      .then((data) => {
        Swal.fire('Contacto', 'Solicitud procesada correctamente', 'success');
        actions.resetForm();
      })
      .catch((err) => {
        Swal.fire('Contacto', 'No se pudo procesar la solicitud', 'error');
      })
      .finally(() => actions.setSubmitting(false));
  };

  const { handleChange, handleSubmit, values, errors, isSubmitting } = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
    validationSchema: validationSchema,
    onSubmit: doSubmit,
    validateOnChange: false,
  });

  return (
    <Container
      maxWidth="sm"
      sx={{ border: 1, paddingX: 5, paddingY: 5, borderRadius: 0.5, borderColor: 'lightgrey', my: 'auto' }}
      justifyContent="center"
    >
      <Typography variant="h5" component="h2" textAlign="left" fontWeight="bold" mb={6}>
        Contactate con nosotros
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
              id="email"
              name="email"
              type="email"
              onChange={handleChange}
              value={values.email}
              label="Email"
              fullWidth
              error={Boolean(errors.email)}
              helperText={errors.email}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              id="phone"
              name="phone"
              type="phone"
              onChange={handleChange}
              value={values.phone}
              label="Teléfono"
              fullWidth
              error={Boolean(errors.phone)}
              helperText={errors.phone}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="message"
              name="message"
              onChange={handleChange}
              value={values.message}
              multiline
              rows={6}
              label="Escribe tu mensaje..."
              fullWidth
              error={Boolean(errors.message)}
              helperText={errors.message}
            />
          </Grid>

          <Grid item>
            <Button variant="contained" fullWidth type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Enviando' : 'Enviar'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default Contact;
