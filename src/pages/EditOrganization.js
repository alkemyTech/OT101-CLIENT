import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { postRequest } from '../services/requestsHandlerService';

const FILE_SIZE = 20 * 1024 * 1024;
const SUPPORTED_FORMATS = [
  "image/jpg",
  "image/jpeg",
  "image/gif",
  "image/png"
];

const validationSchema = yup.object({
  name: yup
    .string()
    .required('Debe ingresar un nombre.')
    .max(250, 'Máximo 250 caracteres'),
  logo: yup
    .mixed()
    .nullable()
    .required("Debe ingresar un archivo")
    .test(
      "fileSize",
      "El archivo no puede superar los 20MB",
      value => value && (value.size <= FILE_SIZE)
      )
      .test(
        "fileFormat",
        "Formato del archivo inválido",
        value => value && SUPPORTED_FORMATS.includes(value.type)
      )
});


const EditOrganization = () => {
  const urlSubmit = '';
  const doSubmit = (formData, actions) => {
    const apiRequest = postRequest(urlSubmit, formData);
    
    apiRequest.then(data => {
        /* Swal.fire('Contacto', 'Solicitud procesada correctamente', 'success'); */
        actions.resetForm();
      })
      .catch(err => {
        /* Swal.fire('Contacto', 'No se pudo procesar la solicitud', 'error'); */
      })
      .finally(() => actions.setSubmitting(false));
  };

  const { handleChange, handleSubmit, values, errors, isSubmitting, setFieldValue } = useFormik({
    initialValues: {
      name: '',
      logo: ''
    },
    validationSchema: validationSchema,
    onSubmit: doSubmit,
    validateOnChange: false,
  });
  console.log(values);
  return (
    <Box sx={{ my: 'auto' }}>
      <Container maxWidth="md">
        <Box
          sx={{ border: 1, paddingX: 2, paddingY: 3, borderRadius: 0.5, borderColor: 'lightgrey' }}
          justifyContent="center"
        >
          <Typography variant="h5" component="h2" textAlign="left" fontWeight="bold" mb={6}>
            Edición Organización
          </Typography>
          <form onSubmit={handleSubmit} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  id="name"
                  name="name"
                  onChange={handleChange}
                  value={values.name}
                  label="Nombre"
                  fullWidth
                  error={Boolean(errors.name)}
                  helperText={errors.name}
                />
              </Grid>
              <Grid item xs={12} >
                <TextField
                  id="logo"
                  name="logo"
                  type="file"
                  onChange={ (event) => {
                    setFieldValue('logo', event.currentTarget.files[0])
                  }}
                  fullWidth
                  error={Boolean(errors.logo)}
                  helperText={errors.logo}
                />
              </Grid>
              <Grid item style={{margin: 'auto'}}>
                <Button variant="contained" fullWidth type="submit" disabled={isSubmitting} >
                { isSubmitting ? 'Enviando' : 'Enviar' }
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </Box>
  );
}

export default EditOrganization;