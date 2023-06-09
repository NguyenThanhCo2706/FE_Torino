import * as yup from 'yup';

export const registerSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup.string().matches(/^\d+$/).required(),
  username: yup.string().required(),
  password: yup.string().required(),
  confirmPassword: yup.string()
    .oneOf([yup.ref("password")], "Passwords do not match")
    .required(),
});

export const changePasswordSchema = yup.object().shape({
  oldPassword: yup.string().required(),
  password: yup.string().required(),
  confirmPassword: yup.string()
    .oneOf([yup.ref("password")], "Passwords do not match")
    .required(),
});

export const updateUserInfo = yup.object().shape({
  firstName: yup.string(),
  lastName: yup.string(),
  phone: yup.string().matches(/^\d+$/).required(),
  birthday: yup.date(),
  gender: yup.string()
});