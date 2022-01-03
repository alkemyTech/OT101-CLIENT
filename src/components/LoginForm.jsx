import { React , useState} from "react"
import { useNavigate, Link } from "react-router-dom"
import {Formik, Form, Field, ErrorMessage} from 'formik'
import { Button, Stack, Container, InputLabel, Input, FormControl, FormHelperText, AlertTitle, Alert } from '@mui/material'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import * as Yup from 'yup'
import { login } from '../features/user/userSlice'
import { useDispatch } from "react-redux";

function LoginForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [failedLogin, setFailedLogin] = useState(false);

    return (
        <Container maxWidth='xs'>
            <Formik 
                initialValues={{ email: '', password: ''}}
                onSubmit={(values, actions) => {
                    dispatch(login(values))
                        .then((response) => {
                            if (!response.payload?.email){
                                setFailedLogin(true);
                            } else {
                                navigate('/backoffice');
                            }
                        })
                        .catch((error) => {
                            throw(error);
                        })
                        .finally(() => actions.setSubmitting(false))
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
                                        <InputLabel htmlFor="email">E-mail</InputLabel>
                                        <Input {...field} />
                                        <ErrorMessage name='email' component={FormHelperText} />
                                    </FormControl>
                                )}
                            </Field>
                      
                            <Field name='password' >
                                {({field, meta}) => (
                                    <FormControl variant='standard' error={meta.touched && meta.error ? true : false}>
                                        <InputLabel htmlFor="password">Password</InputLabel>
                                        <Input {...field} type="password"/>
                                        <ErrorMessage name='password' component={FormHelperText} />
                                    </FormControl>
                                )}
                            </Field>
                            { failedLogin && (
                                <Alert severity="error">
                                    <AlertTitle>Usuario o contraseña incorrectas</AlertTitle>
                                </Alert>
                            )}
                            <Button 
                                variant='contained'
                                disabled={isSubmitting}
                                type='submit'
                                sx={{ bgcolor: errors.email || errors.password ? '#DB5752': '#9AC9FB' }}
                                color={errors.email || errors.password ? 'error' : 'primary'}>
                                Login
                            </Button>
                    </Stack>
                </Form>
                )}
            </Formik>
                <Button component={Link} to='/register' startIcon={<PersonAddAltIcon />} sx={{ color: '#DB5752', display: 'flex', mt: 3, fontSize: 18, fontWeight: 'bold', fontFamily: 'Signika' }}>CREAR CUENTA</Button>
            
        </Container>
    )
}

export default LoginForm
