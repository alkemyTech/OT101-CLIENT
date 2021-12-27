import { React, useState } from "react"
import { Formik, Form, Field } from "formik"
import { Button, Stack, Container, TextField } from "@mui/material"
import ImageInput from "./ImageInput"
import * as Yup from "yup"

function EditHomeForm({ data }) {
	const initialValues = {
		welcomeText: data?.welcomeText || "",
		img1: "",
		img1text: data?.img1.text || "",
		img2: "",
		img2text: data?.img2.text || "",
		img3: "",
		img3text: data?.img3.text || "",
	}

	let submit = async values => {
		await new Promise(r => setTimeout(r, 500))
		values.type = "edit"
		alert(JSON.stringify(values, null, 2))
	}

	return (
		<Container maxWidth='xs' sx={{ marginY: "32px" }}>
			<Formik
				initialValues={initialValues}
				onSubmit={submit}
				validationSchema={Yup.object({
					welcomeText: Yup.string().required("Por favor completar!"),
					img1: Yup.mixed().required("Debe seleccionar una imagen"),
					img1text: Yup.string().required("Por favor completar!"),
					img2: Yup.mixed().required("Debe seleccionar una imagen"),
					img2text: Yup.string().required("Por favor completar!"),
					img3: Yup.mixed().required("Debe seleccionar una imagen"),
					img3text: Yup.string().required("Por favor completar!"),
				})}>
				{({ isSubmitting, errors, touched }) => (
					<Form>
						<Stack spacing={4}>
							<Field name='welcomeText'>
								{({ field, meta }) => (
									<TextField
										{...field}
										multiline
										rows={5}
										label='Mensaje de Bienvenida'
										error={meta.touched && meta.error}
										helperText={errors.welcomeText}
									/>
								)}
							</Field>

							<Field name='img1text'>
								{({ field, meta }) => (
									<TextField
										{...field}
										label='Texto de imagen'
										error={meta.touched && meta.error}
										helperText={errors.img1text}
									/>
								)}
							</Field>
							<Field name='img1'>
								{({ field, meta }) => <ImageInput {...field} />}
							</Field>

							<Field name='img2text'>
								{({ field, meta }) => (
									<TextField
										{...field}
										label='Texto de imagen'
										error={meta.touched && meta.error}
										helperText={errors.img2text}
									/>
								)}
							</Field>
							<Field name='img2'>
								{({ field, meta }) => <ImageInput {...field} />}
							</Field>

							<Field name='img3text'>
								{({ field, meta }) => (
									<TextField
										{...field}
										label='Texto de imagen'
										error={meta.touched && meta.error}
										helperText={errors.img3text}
									/>
								)}
							</Field>
							<Field name='img3'>
								{({ field, meta }) => <ImageInput {...field} />}
							</Field>

							<Button
								variant='contained'
								disabled={isSubmitting}
								type='submit'
								color={errors ? "error" : "primary"}>
								Editar pagina de Inicio
							</Button>
						</Stack>
					</Form>
				)}
			</Formik>
		</Container>
	)
}

export default EditHomeForm
