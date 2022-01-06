import { React, useState } from "react"
import { Formik, Form, Field } from "formik"
import { Button, Stack, Container, TextField } from "@mui/material"
import { patchRequest } from "../services/requestsHandlerService"
import Swal from "sweetalert2"
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

	let submit = async (values, actions) => {
		const dataToSend = new FormData()

		// append all form inputs
		Object.keys(values).forEach(key => {
			dataToSend.append(key, values[key])
		})

		const apiRequest = patchRequest(`/news/{news.id}`, dataToSend, {
			headers: { "content-type": "multipart/form-data" },
		})

		apiRequest
			.then(data => {
				Swal.fire(
					"Pagina de Inicio",
					"Solicitud procesada correctamente",
					"success"
				)
				actions.resetForm({
					values: { name: "", content: "", image: null, categoryId: "" },
				})
			})
			.catch(err => {
				Swal.fire(
					"Pagina de Inicio",
					"No se pudo procesar la solicitud",
					"error"
				)
			})
			.finally(() => actions.setSubmitting(false))
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
				{({ isSubmitting, errors, touched, values, setFieldValue }) => (
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
								{({ field, meta }) => (
									<ImageInput
										{...field}
										image={values.img1 ? values.img1 : null}
										onChange={file => setFieldValue("img1", file)}
										error={meta.touched && meta.error}
									/>
								)}
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
								{({ field, meta }) => (
									<ImageInput
										{...field}
										image={values.img1 ? values.img1 : null}
										onChange={file => setFieldValue("img2", file)}
										error={meta.touched && meta.error}
									/>
								)}
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
								{({ field, meta }) => (
									<ImageInput
										{...field}
										image={values.img1 ? values.img1 : null}
										onChange={file => setFieldValue("img3", file)}
										error={meta.touched && meta.error}
									/>
								)}
							</Field>

							<Button
								variant='contained'
								// disabled={isSubmitting}
								type='submit'
								color='primary'>
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
