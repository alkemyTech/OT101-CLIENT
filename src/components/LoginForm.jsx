import React from "react"
import {Formik, Form, Field, ErrorMessage} from 'formik'
import { Button, Stack, Container, InputLabel, Input, FormControl, FormHelperText } from '@mui/material'
import * as Yup from 'yup'

function LoginForm() {
    return (
        <Container maxWidth='xs'>
            <Formik 
                initialValues={{ email: '', password: ''}}
                onSubmit={async (values) => {
                    await new Promise((r) => setTimeout(r, 500));
                    alert(JSON.stringify(values, null, 2));
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

                            <Button variant='contained' disabled={isSubmitting} type='submit' color={errors.email || errors.password ? 'error' : 'primary'}>Login</Button>
                    </Stack>
                </Form>
                )}
            </Formik>
            
        </Container>
    )
}

export default LoginForm
