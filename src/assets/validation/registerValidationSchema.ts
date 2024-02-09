import * as Yup from 'yup'

export const registerValidationSchema = Yup.object().shape({
  firstName: Yup.string().required('Firstname is required'),
  lastName: Yup.string().required('Lastname is required'),
  password: Yup.string()
    .required('Password is required')
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
      'Password must contain a special character, a number, an uppercase and lowercase letter and a minimum of 8 characters'
    ),
  email: Yup.string().email('Invalid email').required('Email is required')
})
