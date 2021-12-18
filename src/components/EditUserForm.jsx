import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {
  Button,
  Stack,
  Container,
  InputLabel,
  Input,
  FormControl,
  FormHelperText,
  Select,
  MenuItem,
} from '@mui/material';
import * as Yup from 'yup';

function EditUserForm({ user, backOffice }) {
  if (!backOffice) {
    return (
      <Container maxWidth="xs" sx={{ marginY: '32px' }}>
        <Formik
          initialValues={{
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: '',
          }}
          onSubmit={async (values) => {
            await new Promise((r) => setTimeout(r, 500));
            alert(JSON.stringify(values, null, 2));
          }}
          validationSchema={Yup.object({
            firstName: Yup.string().required('Por favor completar!'),
            lastName: Yup.string().required('Por favor completar'),
            roleId: Yup.number().required('Por favor completar!'),
          })}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form>
              <Stack spacing={4}>
                <Field name="firstName">
                  {({ field, meta }) => (
                    <FormControl
                      variant="standard"
                      error={meta.touched && meta.error ? true : false}
                    >
                      <InputLabel htmlFor="firstName">Name</InputLabel>
                      <Input {...field} />
                      <ErrorMessage
                        name="firstName"
                        component={FormHelperText}
                      />
                    </FormControl>
                  )}
                </Field>

                <Field name="lastName">
                  {({ field, meta }) => (
                    <FormControl
                      variant="standard"
                      error={meta.touched && meta.error ? true : false}
                    >
                      <InputLabel htmlFor="lastName">Apellido</InputLabel>
                      <Input {...field} />
                      <ErrorMessage
                        name="lastName"
                        component={FormHelperText}
                      />
                    </FormControl>
                  )}
                </Field>

                <Field name="email">
                  {({ field, meta }) => (
                    <FormControl
                      variant="standard"
                      error={meta.touched && meta.error ? true : false}
                    >
                      <InputLabel htmlFor="email">Email</InputLabel>
                      <Input {...field} />
                      <ErrorMessage name="email" component={FormHelperText} />
                    </FormControl>
                  )}
                </Field>

                <Field name="password">
                  {({ field, meta }) => (
                    <FormControl
                      variant="standard"
                      error={meta.touched && meta.error ? true : false}
                    >
                      <InputLabel htmlFor="password">Contraseña</InputLabel>
                      <Input {...field} />
                      <ErrorMessage
                        name="password"
                        component={FormHelperText}
                      />
                    </FormControl>
                  )}
                </Field>

                <Button
                  variant="contained"
                  disabled={isSubmitting}
                  type="submit"
                  color={errors.email || errors.password ? 'error' : 'primary'}
                >
                  Modificar Datos
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </Container>
    );
  }

  return (
    <Container maxWidth="xs" sx={{ marginY: '32px' }}>
      <Formik
        initialValues={{
          firstName: user.firstName,
          lastName: user.lastName,
          roleId: user.role.id,
        }}
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 500));
          alert(JSON.stringify(values, null, 2));
        }}
        validationSchema={Yup.object({
          firstName: Yup.string().required('Por favor completar!'),
          lastName: Yup.string().required('Por favor completar'),
          roleId: Yup.number().required('Por favor completar!'),
        })}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form>
            <Stack spacing={4}>
              <Field name="firstName">
                {({ field, meta }) => (
                  <FormControl
                    variant="standard"
                    error={meta.touched && meta.error ? true : false}
                  >
                    <InputLabel htmlFor="firstName">Name</InputLabel>
                    <Input {...field} />
                    <ErrorMessage name="firstName" component={FormHelperText} />
                  </FormControl>
                )}
              </Field>

              <Field name="lastName">
                {({ field, meta }) => (
                  <FormControl
                    variant="standard"
                    error={meta.touched && meta.error ? true : false}
                  >
                    <InputLabel htmlFor="lastName">Apellido</InputLabel>
                    <Input {...field} />
                    <ErrorMessage name="lastName" component={FormHelperText} />
                  </FormControl>
                )}
              </Field>

              <Field name="roleId">
                {({ field, meta }) => (
                  <FormControl
                    variant="standard"
                    error={meta.touched && meta.error ? true : false}
                  >
                    <InputLabel htmlFor="roleId">Rol</InputLabel>
                    <Select {...field}>
                      <MenuItem value={1}>Admin</MenuItem>
                      <MenuItem value={2}>Usuario Regular</MenuItem>
                    </Select>
                    <ErrorMessage name="roleId" component={FormHelperText} />
                  </FormControl>
                )}
              </Field>

              <Button
                variant="contained"
                disabled={isSubmitting}
                type="submit"
                color={errors.email || errors.password ? 'error' : 'primary'}
              >
                Modificar Usuario
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </Container>
  );
}

export default EditUserForm;
