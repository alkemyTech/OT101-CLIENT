import React from 'react'
import { Box, TextField, Button } from '@material-ui/core'
import { useFormik } from 'formik';
import * as yup from 'yup';

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

export default function Register() {

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
      <h2>Register</h2>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id='name'
          name='name'
          label='name'
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          fullWidth
          id='lastName'
          name='lastName'
          label='lastNmae'
          value={formik.values.lastName}
          onChange={formik.handleChange}
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          helperText={formik.touched.name && formik.errors.lastName}
        />
        <TextField
          fullWidth
          id='email'
          name='email'
          label='email'
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          fullWidth
          id='password'
          name='password'
          label='password'
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
          label='confirmPassword'
          type='password'
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
          helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
        />
        <Button color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
      </form>
    </div>
  )
}

