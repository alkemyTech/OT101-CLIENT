import React from 'react';
import { useFormik } from 'formik';

export function Contact() {
  const { handleChange, handleSubmit, values } = useFormik({
    initialValues: {
      name: '',
      lastname: '',
      email: '',
      content: '',
    },
    validate: (values) => {
      const errors = {};

      if (!values.name) {
        errors.name = 'Debes ingresar un nombre';
      }

      if (!values.lastname) {
        errors.lastname = 'Debes ingresar un apellido';
      }

      if (!values.email) {
        errors.email = 'Debes ingresar un email';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Ingresa un email válido';
      }

      if (!values.content) {
        errors.content = 'Debes ingresar la consulta';
      }

      return errors;
    },
    onSubmit: (values) => {
      //Agregar llamada a servicio de contacto
    },
  });

  return (
    <section>
      <h2>Contactate con nosotros</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input id="name" name="name" onChange={handleChange} value={values.name} placeholder="Nombre" />
          <input id="lastname" name="lastname" onChange={handleChange} value={values.lastname} placeholder="Apellido" />
        </div>
        <input id="email" name="email" type="email" onChange={handleChange} value={values.email} placeholder="Email" />
        <textarea
          id="content"
          name="content"
          onChange={handleChange}
          value={values.content}
          placeholder="Escribe tu consulta..."
        ></textarea>
        <button>Enviar</button>
      </form>
    </section>
  );
}
