import PropTypes from 'prop-types';

import { Paper, Container, TextField, Typography } from '@material-ui/core'
import { FormControl, FormLabel, FormHelperText } from '@material-ui/core'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { withStyles } from '@material-ui/core'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import Styles from '../styles/FormStyles'
import { postRequest, patchRequest } from '../services/requestsHandlerService';
import ImageInput from './ImageInput'
import { basicAlert } from '../services/sweetAlertService';
import CustumButton from './CustomButton';


const ActivityForm = ({classes, open, activity, requestData, onCancel, onSuccess, onFailure}) => {

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

    const dataToSend = new FormData();

    // append all form inputs
    Object.keys(values).forEach(key => {
      dataToSend.append(key, values[key]);
    });

    const apiRequest = activity?.idKey ?
      patchRequest(`/activities/${activity.idKey}`, dataToSend, {headers: {'content-type': 'multipart/form-data'}}) :
      postRequest(`/activities/`, dataToSend, {headers: {'content-type': 'multipart/form-data'}});

    apiRequest.then(savedActivity => {
      onSuccess(savedActivity);
      })
      .catch(err => {
        onFailure(err);
      })
      .finally(() => actions.setSubmitting(false));
  };

  const formik = useFormik({
    initialValues: {
      name: activity?.name || '',
      image: null,
      content: activity?.content || '',
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

  const onClickSubmit = () => {
    activity?.idKey ?
      basicAlert('Actividad modificada!', '', 'success') :
      basicAlert('Actividad creada!', '', 'success');
    setTimeout(() => onCancel(), 200);
  }

  if (!open) {
    return (null);
  }

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} className={classes.innerBox}>
        <Typography variant="h5" component="h2" fontWeight="bold" mb={6}>
          {activity?.idKey ? "Modificar" : "Crear" } Actividades
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
            image={activity?.image}
            onChange={file => formik.setFieldValue("image", file)}
            error={formik.touched.image && formik.errors.image}
          />
          <CustumButton
            variant="contained"
            type="reset"
            onClick={()=> formReset()}
            className={classes.buttonCancel}
          >
            Cancelar
          </CustumButton>
          <CustumButton
            disabled={formik.isSubmitting}
            color="primary"
            variant="contained"
            type="submit"
            className={classes.buttonOk}
            onClick={onClickSubmit}
          >
            Enviar
          </CustumButton>
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