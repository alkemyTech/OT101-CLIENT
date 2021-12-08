import { useState } from 'react'
import PropTypes from 'prop-types';
import { Paper, Button, Container, MenuItem, TextField, Typography } from '@material-ui/core'
import { FormControl, FormLabel, FormHelperText } from '@material-ui/core'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { withStyles } from '@material-ui/core'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Swal from 'sweetalert2';

import Styles from '../styles/NewsFormStyles'
import { postRequest, patchRequest } from '../services/requestsHandlerService';
import Loading from './Loading';
import ImageInput from './ImageInput'

const validationSchema = yup.object({
  name: yup
    .string()
    .required('Debe ingresar un título.'),
  content: yup
    .string()
    .required('Debe ingresar contenido.'),
  categoryId: yup
    .string()
    .required('Debe seleccionar una categoría'),
  image: yup
    .mixed().required('Debe seleccionar una imagen'),
});


const NewsForm = ({classes, news}) => {
  const [isLoading, setIsLoading] = useState(false);

  const newsSubmit = (values, actions) => {
    setIsLoading(true);

    const dataToSend = new FormData();

    // append all form inputs
    Object.keys(values).forEach(key => {
      dataToSend.append(key, values[key]);
    });

    const apiRequest = news && news.id ?
      patchRequest(`/news/{news.id}`, dataToSend, {headers: {'content-type': 'multipart/form-data'}}) :
      postRequest('/news/', dataToSend, {headers: {'content-type': 'multipart/form-data'}});

    apiRequest.then(data => {
        setIsLoading(false);
        Swal.fire('News', 'Solicitud procesada correctamente', 'success');
        actions.resetForm( {values: {name: '', content: '', image: null, categoryId: ''}} );
      })
      .catch(err => {
        setIsLoading(false);
        Swal.fire('News', 'No se pudo procesar la solicitud', 'error');
      })
      .finally(() => actions.setSubmitting(false));
  };

  const formik = useFormik({
    initialValues: {
      name: news ? news.name : '',
      image: null,
      content: news ? news.content : '',
      categoryId: news ? news.categoryId : '',
    },
    validationSchema: validationSchema,
    onSubmit: newsSubmit,
  });

  const CKinputHandler = (event, editor) => {
    formik.setFieldValue("content", editor.getData());
  }

  if (isLoading) {
    return (<Loading />);
  }

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} className={classes.innerBox}>
        <Typography variant="h5" component="h2" fontWeight="bold" mb={6}>
          {news && news.id ? "Modificar" : "Crear" } Novedad
        </Typography>
        <form onSubmit={formik.handleSubmit} className={classes.form}>
          <TextField
            fullWidth
            id='name'
            name='name'
            label='Título'
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            className={classes.textField}
          />
          <FormControl
            fullWidth
            className={classes.textField}
            error={formik.touched.content && Boolean(formik.errors.content)}
          >
            <FormLabel htmlFor="content">Contenido</FormLabel>
            <CKEditor
                id='content'
                editor={ ClassicEditor }
                data={formik.values.content}
                onChange={CKinputHandler}
            />
            <FormHelperText id="content">
            {formik.touched.content && formik.errors.content}
            </FormHelperText>
          </FormControl>
          <TextField
            select
            fullWidth
            id="categoryId"
            name="categoryId"
            label="Categoría"
            value={formik.values.categoryId}
            onChange={formik.handleChange}
            error={formik.touched.categoryId && Boolean(formik.errors.categoryId)}
            helperText={formik.touched.categoryId && formik.errors.categoryId}
            className={classes.textField}
          >
              <MenuItem key="news" value="1">
                News
              </MenuItem>
          </TextField>
          <ImageInput
            name="image"
            image={news ? news.image : null}
            onChange={file => formik.setFieldValue("image", file)}
            error={formik.touched.image && formik.errors.image}
          />
          <Button
            fullWidth
            disabled={formik.isSubmitting}
            color="primary"
            variant="contained"
            type="submit"
            className={classes.button}
          >
            Enviar
          </Button>
        </form>
      </Paper>
    </Container>
  )
}

NewsForm.propTypes = {
  news: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string,
    content: PropTypes.string,
    image: PropTypes.string,
    categoryId: PropTypes.number
  })
}

export default withStyles(Styles)(NewsForm)