/* import { useState } from 'react'; */
import PropTypes from 'prop-types';

import { Paper, Container, TextField, Typography, withStyles, FormControl, FormLabel, FormHelperText } from '@material-ui/core'
import CustomButton from './CustomButton';
import { useFormik } from 'formik'
import * as yup from 'yup'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import Styles from '../styles/FormStyles'
import { postRequest, patchRequest } from '../services/requestsHandlerService';
import ImageInput from './ImageInput'


const TestimonialForm = ({classes, open, testimonial, onCancel, onSuccess, onFailure}) => {
  const validationSchema = yup.object({
    name: yup
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
    const dataToSend = new FormData();

    // append all form inputs
    Object.keys(values).forEach(key => {
      dataToSend.append(key, values[key]);
    });

    const apiRequest = testimonial?.idKey ?
      patchRequest(`/testimonials/${testimonial.idKey}`, dataToSend, {headers: {'content-type': 'multipart/form-data'}}) :
      postRequest(`/testimonials/`, dataToSend, {headers: {'content-type': 'multipart/form-data'}});

    apiRequest.then(savedtestimonial => {
        onSuccess(savedtestimonial);
      })
      .catch(err => {
        onFailure(err);
      })
      .finally(() => actions.setSubmitting(false));
  };

  const formik = useFormik({
    initialValues: {
      name: testimonial ? testimonial.name : '',
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

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} className={classes.innerBox}>
        <Typography variant="h5" component="h2" fontWeight="bold" mb={6}>
          {testimonial?.idKey ? "Modificar" : "Crear" } Testimonios
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
          <ImageInput
            name="image"
            image={testimonial ? testimonial.image : null}
            onChange={file => formik.setFieldValue("image", file)}
            error={formik.touched.image && formik.errors.image}
          />
          <CustomButton
            variant="contained"
            type="reset"
            onClick={()=>formReset()}
            className={classes.buttonCancel}
          >
            Cancelar
          </CustomButton>
          <CustomButton
            disabled={formik.isSubmitting}
            color="primary"
            variant="contained"
            type="submit"
            className={classes.buttonOk}
          >
            Enviar
          </CustomButton>
        </form>
      </Paper>
    </Container>
  )
}

TestimonialForm.propTypes = {
  open: PropTypes.bool,
  testimonial: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string,
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