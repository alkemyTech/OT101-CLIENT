import React from "react"
import {Formik, Form, Field, ErrorMessage} from 'formik'
import { Button, Stack, Container, TextField } from '@mui/material'
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
                {({isSubmitting}) => (
                <Form>
                    <Stack spacing={2}>
                  
                            <label htmlFor="email">Email:</label>
                            <Field type='text' name='email' /*component={TextField}*//>
                            <ErrorMessage name='email' component="div" />
                
                            <label htmlFor="password">Password:</label>
                            <Field type='password' name='password' /*component={TextField}*/ />
                            <ErrorMessage name='password' component="div" />

                            <Button variant='contained' disabled={isSubmitting} type='submit'>Login</Button>
                    </Stack>
                </Form>
                )}
            </Formik>
            
        </Container>
    )
}

export default LoginForm
