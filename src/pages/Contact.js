import React from 'react';
import { useFormik } from 'formik';
import { Button, Container, Grid, TextField, Typography } from '@mui/material';

function Contact() {
  const { handleChange, handleSubmit, values, errors } = useFormik({
    initialValues: {
      name: '',
      lastname: '',
      email: '',
      phone: '',
      content: '',
    },

    validate: (values) => {
      const errors = {};

      if (!values.name) {
        errors.name = 'Debes ingresar un nombre';
      }

      if (!values.lastname) {
        errors.lastname = 'Debes ingresar un apellido';
      }
      if (!values.phone) {
        errors.phone = 'Debes ingresar un número de teléfono';
      }

      if (!values.email) {
        errors.email = 'Debes ingresar un email';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Ingresa un email válido';
      }

      if (!values.content) {
        errors.content = 'Debes ingresar la consulta';
      }

      return errors;
    },
    onSubmit: (values) => {
      //Agregar llamada a servicio de contacto
    },
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
          <Grid item xs={6}>
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
          <Grid item xs={6}>
            <TextField
              id="lastname"
              name="lastname"
              onChange={handleChange}
              value={values.lastname}
              label="Apellido"
              fullWidth
              error={Boolean(errors.lastname)}
              helperText={errors.lastname}
            />
          </Grid>
          <Grid item xs={12}>
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
          <Grid item xs={12}>
            <TextField
              id="phone"
              name="phone"
              type="phone"
              onChange={handleChange}
              value={values.phone}
              label="Phone"
              fullWidth
              error={Boolean(errors.phone)}
              helperText={errors.phone}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="content"
              name="content"
              onChange={handleChange}
              value={values.content}
              multiline
              label="Escribe tu consulta..."
              fullWidth
              error={Boolean(errors.content)}
              helperText={errors.content}
            />
          </Grid>

          <Grid item>
            <Button variant="contained" fullWidth type="submit">
              Enviar
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default Contact;
