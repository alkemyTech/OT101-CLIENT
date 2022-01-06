import React from "react"
import { Formik, Form, Field } from "formik"
import { Button, Stack, Container, Paper, TextField } from "@mui/material"
import { withStyles } from '@material-ui/core'
import Styles from '../styles/FormStyles'
import * as Yup from "yup"
import { postRequest, patchRequest } from '../services/requestsHandlerService';


function CategoriesForm({classes, category, onCancel, onSuccess, onFailure}) {
	const initialValues = {
		name: category?.name || "",
		description: category?.description || "",
	}

	const submit = (values, actions) => {
        const apiRequest = category?.idKey ?
            patchRequest(`/categories/${category.idKey}`, values) :
            postRequest(`/categories/`, values);
    
        apiRequest.then(savedActivity => onSuccess(savedActivity))
          .catch(err => onFailure(err))
          .finally(() => actions.setSubmitting(false));
    };

	return (
        <Container maxWidth="sm" sx={{p: 5}}>
            <Paper elevation={3} className={classes.innerBox}>
                <Formik
                    initialValues={initialValues}
                    onSubmit={submit}
                    validationSchema={Yup.object({
                        name: Yup.string().required("Por favor completar!"),
                        description: Yup.string().required("Por favor completar"),
                    })}>
                    {({ isSubmitting, errors, touched }) => (
                        <Form>
                            <Stack spacing={4}>
                                <Field name='name'>
                                    {({ field, meta }) => (
                                        <TextField
                                            {...field}
                                            label='Nombre'
                                            error={meta.touched && meta.error}
                                            helperText={errors.name}
                                        />
                                    )}
                                </Field>

                                <Field name='description'>
                                    {({ field, meta }) => (
                                        <TextField
                                            {...field}
                                            multiline
                                            rows={5}
                                            label='Descripcion'
                                            error={meta.touched && meta.error}
                                            helperText={errors.description}
                                        />
                                    )}
                                </Field>

                                <Button
                                    variant='contained'
                                    disabled={isSubmitting}
                                    type='submit'
                                    color={errors.name || errors.description ? "error" : "primary"}>
                                    {category?.idKey ? "editar categoria" : "crear categoria"}
                                </Button>
                            </Stack>
                        </Form>
                    )}
			    </Formik>
            </Paper>
		</Container>
	)
}

export default withStyles(Styles)(CategoriesForm);