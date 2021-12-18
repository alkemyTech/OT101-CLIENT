import React from "react"
import { Formik, Form, Field } from "formik"
import { Button, Stack, Container, TextField } from "@mui/material"
import * as Yup from "yup"

function CategoriesForm({ category }) {
	const initialValues = {
		name: category?.name || "",
		description: category?.description || "",
	}

	let submit

	if (category?.id) {
		submit = async values => {
			await new Promise(r => setTimeout(r, 500))
			values.type = "edit"
			alert(JSON.stringify(values, null, 2))
		}
	} else {
		submit = async values => {
			await new Promise(r => setTimeout(r, 500))
			values.type = "create"
			alert(JSON.stringify(values, null, 2))
		}
	}

	return (
		<Container maxWidth='xs' sx={{ marginY: "32px" }}>
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
								{category?.id ? "editar categoria" : "crear categoria"}
							</Button>
						</Stack>
					</Form>
				)}
			</Formik>
		</Container>
	)
}

export default CategoriesForm
