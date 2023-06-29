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
  type: yup.string(),
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
  birthday: yup.string(),
  gender: yup.string()
});

export const createOrder = yup.object().shape({
  receiveType: yup.number().required(),
  address: yup.object().shape({
      provinceId: yup.string().nullable(),
      districtId: yup.string().nullable(),
      communeId: yup.string().nullable(),
      detailAddress: yup.string().nullable(),
  }),
  // then: yup.object().shape({
  //   provinceId: yup.string().required(),
  //   districtId: yup.string().required(),
  //   communeId: yup.string().required(),
  //   detailAddress: yup.string().required(),
  // })
  // ),
  status: yup.number().required(),
  dateOfReceive: yup.date().required(),
  note: yup.string(),
});

export const emailSchema = yup.object().shape({
  email: yup.string().email().required(),
})

export const contactSchema = yup.object().shape({
  name: yup.string(),
  email: yup.string().email(),
  phone: yup.string(),
  content: yup.string(),
  check: yup.string(),
});
