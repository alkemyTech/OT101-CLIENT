import { React , useState} from "react"
import { useNavigate } from "react-router-dom"
import {Formik, Form, Field, ErrorMessage} from 'formik'
import { Button, Stack, Container, InputLabel, Input, FormControl, FormHelperText, AlertTitle, Alert, CircularProgress } from '@mui/material'
import * as Yup from 'yup'
import login from '../features/user/userSlice'

function LoginForm() {
    const navigate = useNavigate();
    const [status, setStatus] = useState(undefined);

    return (
        <Container maxWidth='xs'>
            <Formik 
                initialValues={{ email: '', password: ''}}
                onSubmit={(dispatch, values) => {
                    dispatch(login(values))
                        .then((response) => {
                        if(response.email === undefined){
                            setStatus({ type: 'error' });
                        }else{
                            setStatus({ type: 'success' });
                            setTimeout(function(){ navigate('/'); }, 2000); //TimeOut used to simulate DB delay
                        }
                        })
                        .catch((error) => {
                        throw(error);
                        });
                    // alert(JSON.stringify(values, null, 2));
                  }}
                validationSchema={Yup.object({
                    email: Yup.string().required('Por favor completar!').email('Por favor ingresa un email valido'),
                    password: Yup.string().required('Por favor completar')
                })}
            >
                {({isSubmitting, errors, touched}) => (
                <Form>
                    <Stack spacing={4}>
                  
                      
                            <Field name='email' >
                                {({field, meta}) => (
                                    <FormControl variant='standard' error={meta.touched && meta.error ? true : false}>
                                        <InputLabel htmlFor="email">Name</InputLabel>
                                        <Input {...field} />
                                        <ErrorMessage name='email' component={FormHelperText} />
                                    </FormControl>
                                )}
                            </Field>
                
                      
                            <Field name='password' >
                                {({field, meta}) => (
                                    <FormControl variant='standard' error={meta.touched && meta.error ? true : false}>
                                        <InputLabel htmlFor="password">Password</InputLabel>
                                        <Input {...field} />
                                        <ErrorMessage name='password' component={FormHelperText} />
                                    </FormControl>
                                )}
                            </Field>
                            {status?.type === 'waiting' && <CircularProgress />
              }
              {status?.type === 'success' && <Alert severity="success">
                <AlertTitle>Usuario Encontrado...redirigiendo</AlertTitle>
              </Alert>}
      {status?.type === 'error' && (
        <Alert severity="error">
        <AlertTitle>Usuario o contraseña incorrectas</AlertTitle>
      
      </Alert>
      )}
                            <Button variant='contained' disabled={isSubmitting} type='submit' color={errors.email || errors.password ? 'error' : 'primary'}>Login</Button>
                    </Stack>
                </Form>
                )}
            </Formik>
            
        </Container>
    )
}

export default LoginForm
