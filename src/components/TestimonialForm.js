/* import { useState } from 'react'; */
import PropTypes from 'prop-types';

import { Paper, Button, Container, TextField, Typography, withStyles, FormControl, FormLabel, FormHelperText } from '@material-ui/core'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import Styles from '../styles/FormStyles'
import { postRequest, patchRequest } from '../services/requestsHandlerService';
import ImageInput from './ImageInput'


const TestimonialForm = ({classes, open, testimonial, onCancel, onSuccess, onFailure}) => {
  /* const [isLoading, setIsLoading] = useState(false); */

  const validationSchema = yup.object({
    nombre: yup
      .string()
      .required('Debe ingresar un título.'),
    content: yup
      .string()
      .required('Debe ingresar contenido.'),
    // don't require image if testimonial already have one
    image: testimonial && testimonial.image ? null : yup
      .mixed()
      .required('Debe seleccionar una imagen'),
  });

  const testimonialSubmit = (values, actions) => {
    /* setIsLoading(true); */

    const dataToSend = new FormData();

    // append all form inputs
    Object.keys(values).forEach(key => {
      dataToSend.append(key, values[key]);
    });

    const apiRequest = testimonial && testimonial.id ?
      patchRequest(`${process.env.REACT_APP_URL_SERVER}/testimonials/${testimonial.id}`, dataToSend, {headers: {'content-type': 'multipart/form-data'}}) :
      postRequest(`${process.env.REACT_APP_URL_SERVER}/testimonials/`, dataToSend, {headers: {'content-type': 'multipart/form-data'}});

    apiRequest.then(savedtestimonial => {
        /* setIsLoading(false); */

        onSuccess(savedtestimonial);
      })
      .catch(err => {
        /* setIsLoading(false); */

        onFailure(err);
      })
      .finally(() => actions.setSubmitting(false));
  };

  const formik = useFormik({
    initialValues: {
      nombre: testimonial ? testimonial.nombre : '',
      image: null,
      content: testimonial ? testimonial.content : '',
    },
    validationSchema: validationSchema,
    onSubmit: testimonialSubmit,
  });

  const formReset = () => {
    formik.resetForm();
    onCancel();
  };

  const CKinputHandler = (event, editor) => {
    formik.setFieldValue("content", editor.getData());
  }

  if (!open) {
    return (null);
  }

  /* if (isLoading) {
    return (<Loading />);
  } */

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} className={classes.innerBox}>
        <Typography variant="h5" component="h2" fontWeight="bold" mb={6}>
          {testimonial && testimonial.id ? "Modificar" : "Crear" } Testimonios
        </Typography>
        <form onSubmit={formik.handleSubmit} className={classes.form}>
          <TextField
            fullWidth
            id='nombre'
            name='nombre'
            label='Título'
            value={formik.values.nombre}
            onChange={formik.handleChange}
            error={formik.touched.nombre && Boolean(formik.errors.nombre)}
            helperText={formik.touched.nombre && formik.errors.nombre}
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
          <ImageInput
            name="image"
            image={testimonial ? testimonial.image : null}
            onChange={file => formik.setFieldValue("image", file)}
            error={formik.touched.image && formik.errors.image}
          />
          <Button
            variant="contained"
            type="reset"
            onClick={()=>formReset()}
            className={classes.buttonCancel}
          >
            Cancelar
          </Button>
          <Button
            disabled={formik.isSubmitting}
            color="primary"
            variant="contained"
            type="submit"
            className={classes.buttonOk}
          >
            Enviar
          </Button>
        </form>
      </Paper>
    </Container>
  )
}

TestimonialForm.propTypes = {
  open: PropTypes.bool,
  testimonial: PropTypes.shape({
    id: PropTypes.number.isRequired,
    nombre: PropTypes.string,
    content: PropTypes.string,
    image: PropTypes.string,
  }),
  onCancel: PropTypes.func,
  onSuccess: PropTypes.func,
  onFailure: PropTypes.func,
};

TestimonialForm.defaultProps = {
  onCancel: () => {},
  onSuccess: () => {},
  onFailure: () => {},
}

export default withStyles(Styles)(TestimonialForm)