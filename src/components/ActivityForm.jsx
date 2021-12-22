import { useState } from 'react';
import PropTypes from 'prop-types';

import { Paper, Button, Container, TextField, Typography } from '@material-ui/core'
import { FormControl, FormLabel, FormHelperText } from '@material-ui/core'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { withStyles } from '@material-ui/core'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import Styles from '../styles/FormStyles'
import { postRequest, patchRequest } from '../services/requestsHandlerService';
import Loading from './Loading';
import ImageInput from './ImageInput'


const ActivityForm = ({classes, open, activity, onCancel, onSuccess, onFailure}) => {
  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = yup.object({
    name: yup
      .string()
      .required('Debe ingresar un título.'),
    content: yup
      .string()
      .required('Debe ingresar contenido.'),
    // don't require image if activity already have one
    image: activity && activity.image ? null : yup
      .mixed()
      .required('Debe seleccionar una imagen'),
  });

  const activitySubmit = (values, actions) => {
    setIsLoading(true);

    const dataToSend = new FormData();

    // append all form inputs
    Object.keys(values).forEach(key => {
      dataToSend.append(key, values[key]);
    });

    const apiRequest = activity && activity.id ?
      patchRequest(`/activities/${activity.id}`, dataToSend, {headers: {'content-type': 'multipart/form-data'}}) :
      postRequest('/activities/', dataToSend, {headers: {'content-type': 'multipart/form-data'}});

    apiRequest.then(savedActivity => {
        setIsLoading(false);

        onSuccess(savedActivity);
      })
      .catch(err => {
        setIsLoading(false);

        onFailure(err);
      })
      .finally(() => actions.setSubmitting(false));
  };

  const formik = useFormik({
    initialValues: {
      name: activity ? activity.name : '',
      image: null,
      content: activity ? activity.content : '',
    },
    validationSchema: validationSchema,
    onSubmit: activitySubmit,
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

  if (isLoading) {
    return (<Loading />);
  }

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} className={classes.innerBox}>
        <Typography variant="h5" component="h2" fontWeight="bold" mb={6}>
          {activity && activity.id ? "Modificar" : "Crear" } Actividades
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
            image={activity ? activity.image : null}
            onChange={file => formik.setFieldValue("image", file)}
            error={formik.touched.image && formik.errors.image}
          />
          <Button
            variant="contained"
            type="reset"
            onClick={()=>formik.resetForm()}
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

ActivityForm.propTypes = {
  open: PropTypes.bool,
  activity: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string,
    content: PropTypes.string,
    image: PropTypes.string,
  }),
  onCancel: PropTypes.func,
  onSuccess: PropTypes.func,
  onFailure: PropTypes.func,
};

ActivityForm.defaultProps = {
  onCancel: () => {},
  onSuccess: () => {},
  onFailure: () => {},
}

export default withStyles(Styles)(ActivityForm)