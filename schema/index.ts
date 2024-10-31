import * as yup from 'yup';

export const singInUserSchema = yup.object().shape({
  email: yup.string().email('El correo debe ser un correo valido.').required('El correo es requerido.'),
  password: yup
    .string()
    .required('La contraseña es requerida.')
    .min(6, 'La contraseña debe ser de al menos 6 caracteres.'),
});

export const singUpUserSchema = yup.object().shape({
  username: yup.string().required('El nombre completo es requerido.'),
  lastname: yup.string().required('El apellido completo es requerido.'),
  email: yup.string().email('El correo debe ser un correo valido.').required('El correo es requerido.'),
  password: yup.string().required('La contraseña es obligatoria.'),
  passwordConfirmation: yup
    .string()
    .required('La confirmacion de la contraseña es requerida.')
    .oneOf([yup.ref('password')], 'Las contraseñas deben coincidir.'),
  termsConditions: yup.boolean().oneOf([true], 'Debes aceptar los términos y condiciones.'),
});
