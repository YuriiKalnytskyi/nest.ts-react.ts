import * as Yup from 'yup'import { validateSchema } from '../../common/validation/validateShema'export const validationSchemaExample = Yup.object().shape({  email: validateSchema.email,  password: validateSchema.password})