import React from 'react'
import { Box, TextField, Button, Container, Typography } from '@material-ui/core'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { withStyles } from '@material-ui/core'

import Styles from '../styles/RegisterFormStyles'

const validationSchema = yup.object({
  name: yup.string().required('Debe ingresar su nombre.'),
  lastName: yup.string().required('Debe ingresar su apellido.'),
  email: yup.string().email('Debe ingresar un email valido.').required('Debe ingresar un email.'),
  password: yup.string().min(6, 'La contraseña debe tener al menos 6 caracteres').required('Debe ingresar una contraseña.'),
  confirmPassword: yup.string().required('Debe confirmar su contraseña.').when("password", {
    is: val => (val && val.length > 0 ? true : false),
    then: yup.string().oneOf(
      [yup.ref("password")],
      "Las contraseñas no coinciden"
    )
  })
})

function Register(props) {

  const {classes} = props

  const formik = useFormik({
    initialValues: {
      name: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });


  return (
    <div>
      <Box>
        <Container maxWidth="sm">
          <Box className={classes.innerBox}>
            <Typography variant="h5" component="h2" textAlign="left" fontWeight="bold" mb={6}>
              Registrarse
            </Typography>
            <form onSubmit={formik.handleSubmit} className={classes.form}>
              <TextField
                fullWidth
                id='name'
                name='name'
                label='nombre'
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
              <TextField
                fullWidth
                id='lastName'
                name='lastName'
                label='Apellido'
                value={formik.values.lastName}
                onChange={formik.handleChange}
                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                helperText={formik.touched.name && formik.errors.lastName}
              />
              <TextField
                fullWidth
                id='email'
                name='email'
                label='Email'
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <TextField
                fullWidth
                id='password'
                name='password'
                label='Contraseña'
                type='password'
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />
              <TextField
                fullWidth
                id='confirmPassword'
                name='confirmPassword'
                label='Confirmar contraseña'
                type='password'
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
              />
              <Button color="primary" variant="contained" fullWidth type="submit" className={classes.button}>
                Enviar
              </Button>
            </form>
          </Box>
        </Container>
      </Box>
    </div>
  )
}

export default withStyles(Styles)(Register)