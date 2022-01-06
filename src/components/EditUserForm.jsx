import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {
  Button,
  Stack,
  Container,
  Paper,
  InputLabel,
  Input,
  FormControl,
  FormHelperText,
  Select,
  MenuItem,
} from '@mui/material';
import { withStyles } from '@material-ui/core'
import Styles from '../styles/FormStyles';
import CustomButton from './CustomButton';
import * as Yup from 'yup';
import { postRequest, patchRequest } from '../services/requestsHandlerService';

function EditUserForm({ classes, user, backOffice, onSuccess, onFailure }) {
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
          onSubmit={async (values, actions) => {
            console.log("User normal!!!")
            const apiRequest = user?.idKey ?
              patchRequest('/me/', values) :
              postRequest(`/users/`, values);

            apiRequest.then(updatedUser => onSuccess(updatedUser))
              .catch(err => onFailure(err))
              .finally(() => actions.setSubmitting(false));
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

                <CustomButton
                  variant="contained"
                  disabled={isSubmitting}
                  type="submit"
                  color={errors.email || errors.password ? 'error' : 'primary'}
                >
                  Modificar Datos
                </CustomButton>
              </Stack>
            </Form>
          )}
        </Formik>
      </Container>
    );
  }

  return (
    <Container maxWidth="xs" sx={{ marginY: '32px' }}>
      <Paper elevation={3} className={classes.innerBox}>
        <Formik
          initialValues={{
            firstName: user.firstName || '',
            lastName: user.lastName || '',
            email: user.email || '',
            roleId: user.roleId,
          }}
          onSubmit={async (values, actions) => {
            const apiRequest = user?.idKey ?
              patchRequest(`/users/${user.idKey}`, values) :
              postRequest(`/users/`, values);

            apiRequest.then(updatedUser => onSuccess(updatedUser))
              .catch(err => onFailure(err))
              .finally(() => actions.setSubmitting(false));
          }}
          validationSchema={Yup.object({
            firstName: Yup.string().required('Por favor completar!'),
            lastName: Yup.string().required('Por favor completar'),
            email: Yup.string().required('Por favor completar'),
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
      </Paper>
    </Container>
  );
}

EditUserForm.propTypes = {
  open: PropTypes.bool,
  activity: PropTypes.shape({
    idKey: PropTypes.number.isRequired,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    image: PropTypes.string,
    roleId: PropTypes.number,
  }),
  onCancel: PropTypes.func,
  onSuccess: PropTypes.func,
  onFailure: PropTypes.func,
};

EditUserForm.defaultProps = {
  onCancel: () => {},
  onSuccess: () => {},
  onFailure: () => {},
}

export default withStyles(Styles)(EditUserForm);
