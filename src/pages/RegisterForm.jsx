import { React , useState} from "react"
import { useNavigate } from "react-router-dom"
import {Formik, Form, Field, ErrorMessage} from 'formik'
import { Button, Stack, Container, InputLabel, Input, FormControl, FormHelperText, AlertTitle, Alert, CircularProgress } from '@mui/material'
import * as yup from 'yup'
import * as authService from '../services/authService';

function RegisterForm() {
    const navigate = useNavigate();
    const [status, setStatus] = useState(undefined);

    return (
        <Container maxWidth='xs'>
            <Formik 
                initialValues={{ name: '', lastName: '', email: '', password: '', confirmPassword: ''}}
                onSubmit={(values) => {
                  setStatus({ type: 'waiting' });
                    authService.register(values)
                    .then(() => {
                    setStatus({ type: 'success' });
                    setTimeout(function(){ navigate('/'); }, 2000); //TimeOut used to simulate DB delay
                    })
                    .catch((error) => {
                    setStatus({ type: 'error', error });
                    });  
                  }}
                validationSchema={yup.object({
                    name: yup.string().required('Debe ingresar su nombre.'),
                    lastName: yup.string().required('Debe ingresar su apellido.'),
                    email: yup.string().email('Debe ingresar un email valido.').required('Debe ingresar un email.'),
                    password: yup
                        .string()
                        .min(6, 'La contraseña debe tener al menos 6 caracteres')
                        .required('Debe ingresar una contraseña.'),
                    confirmPassword: yup
                        .string()
                        .required('Debe confirmar su contraseña.')
                        .when('password', {
                        is: (val) => (val && val.length > 0 ? true : false),
                        then: yup.string().oneOf([yup.ref('password')], 'Las contraseñas no coinciden'),
                    }),
                })}
            >
                {({isSubmitting, errors, touched}) => (
                <Form>
                    <Stack spacing={2}>
                        <Field name='name' >
                            {({field, meta}) => (
                                <FormControl variant='standard' error={meta.touched && meta.error ? true : false}>
                                    <InputLabel htmlFor="name" >Nombre</InputLabel>
                                    <Input {...field} />
                                    <ErrorMessage name='name' component={FormHelperText} />
                                </FormControl>
                            )}
                        </Field>
                        <Field name='lastName' >
                            {({field, meta}) => (
                                <FormControl variant='standard' error={meta.touched && meta.error ? true : false}>
                                    <InputLabel htmlFor="lastName">Apellido</InputLabel>
                                    <Input {...field} />
                                    <ErrorMessage name='lastName' component={FormHelperText} />
                                </FormControl>
                            )}
                        </Field>
                        <Field name='email' >
                            {({field, meta}) => (
                                <FormControl variant='standard' error={meta.touched && meta.error ? true : false}>
                                    <InputLabel htmlFor="email">Email</InputLabel>
                                    <Input {...field} />
                                    <ErrorMessage name='email' component={FormHelperText} />
                                </FormControl>
                            )}
                        </Field>
                        <Field name='password' >
                            {({field, meta}) => (
                                <FormControl variant='standard' error={meta.touched && meta.error ? true : false}>
                                    <InputLabel htmlFor="password">Contraseña</InputLabel>
                                    <Input {...field} type='password'/>
                                    <ErrorMessage name='password' component={FormHelperText} />
                                </FormControl>
                            )}
                        </Field>
                        <Field name='confirmPassword' >
                            {({field, meta}) => (
                                <FormControl variant='standard' error={meta.touched && meta.error ? true : false}>
                                    <InputLabel htmlFor="confirmPassword">Confirmar Contraseña</InputLabel>
                                    <Input {...field} type='password'/>
                                    <ErrorMessage name='confirmPassword' component={FormHelperText} />
                                </FormControl>
                            )}
                        </Field>
                        {status?.type === 'waiting' && <CircularProgress />}
              {status?.type === 'success' && <Alert severity="success">
                <AlertTitle>Registro exitoso...redirigiendo</AlertTitle>
              </Alert>}
      {status?.type === 'error' && (
        <Alert severity="error">
        <AlertTitle>Algunas datos son incorrectos</AlertTitle>
      
      </Alert>
      )}
                            <Button variant='contained' disabled={isSubmitting} type='submit' sx={{ bgcolor: errors.email || errors.password ? '#DB5752': '#9AC9FB' }}>Crear Usuario</Button>
                    </Stack>
                </Form>
                )}
            </Formik>
            
        </Container>
    )
}

export default RegisterForm