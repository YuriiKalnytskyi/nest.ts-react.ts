import * as Yup from 'yup';

export const validateSchema = {
  email: Yup.string()
    .email('common.validateSchema_email_invalid')
    .required('common.validateSchema_email_required'),
  password: Yup.string()
    .min(8, 'common.validateSchema_password_length')
    .required('common.validateSchema_password_required'),
};

