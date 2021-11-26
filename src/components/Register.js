import React from 'react'
import { Box, TextField } from '@material-ui/core'
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
  name: yup.string().required('Debe ingresar su nombre.'),
  lastName: yup.string().required('Debe ingresar su apellido.'),
  email: yup.string().email('Debe ingresar un email valido.').required('Debe ingresar un email.'),
  password: yup.string().min(6).required('Debe ingresar una contraseña.')
})

export default function Register() {

  const formik = useFormik({
    initialValues: {

    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });


  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id='name'
          name='name'
          label='name'
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.errors.name ? true : false}
          helperText={formik.errors.name}
        />
        <TextField
          fullWidth
          id='lastName'
          name='lastName'
          label='lastNmae'
          value={formik.values.lastName}
          onChange={formik.handleChange}
          error={formik.errors.lastName ? true : false}
          helperText={formik.errors.lastName}
        />
        <TextField
          fullWidth
          id='email'
          name='email'
          label='email'
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.errors.email ? true : false}
          helperText={formik.errors.email}
        />
        <TextField
          fullWidth
          id='password'
          name='password'
          label='password'
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.errors.password ? true : false}
          helperText={formik.errors.password}
        />
      </form>
    </div>
  )
}

