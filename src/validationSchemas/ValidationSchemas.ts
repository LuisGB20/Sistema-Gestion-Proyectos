import * as yup from 'yup'

export const ResourceValidationSchema = yup.object({
  name: yup.string().required('El nombre es obligatorio'),
  description: yup.string().required('La descripción es obligatoria'),
  quantity: yup
    .number()
    .required('La cantidad es obligatoria')
    .min(1, 'La cantidad debe ser al menos 1')
    .max(1000, 'La cantidad no puede exceder 1000'),
})

export const CreateEmployeeValidationSchema = yup.object({
  email: yup
    .string()
    .email('El correo electrónico no es válido')
    .required('El correo electrónico es obligatorio'),
  password: yup
    .string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .required('La contraseña es obligatoria'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Las contraseñas deben coincidir')
    .required('La confirmación de la contraseña es obligatoria'),
  name: yup
    .string()
    .required('El nombre es obligatorio'),

  lastName: yup
    .string()
    .required('El apellido es obligatorio'),
  age: yup
    .number()
    .min(18, 'La edad debe ser al menos 18')
    .required('La edad es obligatoria'),
  sexo: yup
    .string()
    .oneOf(['0', '1', '2', '3'], 'Sexo no válido') // 0 No especificado, 1 Masculino, 2 Femenino, 3 Otro
    .required('El sexo es obligatorio'),
  curp: yup
    .string()
    .matches(
      /^(([A-ZÑ&]{4})([0-9]{2})([0][13578]|[1][02])(([0][1-9]|[12][\d])|[3][01])([A-Z0-9]{3}))|(([A-ZÑ&]{4})([0-9]{2})([0][13456789]|[1][012])(([0][1-9]|[12][\d])|[3][0])([A-Z0-9]{3}))|(([A-ZÑ&]{4})([02468][048]|[13579][26])[0][2]([0][1-9]|[12][\d])([A-Z0-9]{3}))|(([A-ZÑ&]{4})([0-9]{2})[0][2]([0][1-9]|[1][0-9]|[2][0-8])([A-Z0-9]{3}))$/,
      'CURP no válido'
    )
    .required('La CURP es obligatoria'),

  rfc: yup
    .string()
    .matches(/^^(([A-ZÑ&]{4})([0-9]{2})([0][13578]|[1][02])(([0][1-9]|[12][\\d])|[3][01])([A-Z0-9]{3}))|(([A-ZÑ&]{4})([0-9]{2})([0][13456789]|[1][012])(([0][1-9]|[12][\\d])|[3][0])([A-Z0-9]{3}))|(([A-ZÑ&]{4})([02468][048]|[13579][26])[0][2]([0][1-9]|[12][\\d])([A-Z0-9]{3}))|(([A-ZÑ&]{4})([0-9]{2})[0][2]([0][1-9]|[1][0-9]|[2][0-8])([A-Z0-9]{3}))$/, 'RFC no válido') // Validación para RFC
    .required('El RFC es obligatorio'),

  salary: yup
    .string()
    .matches(/^\d+(\.\d{1,2})?$/, 'El salario debe ser un número válido y positivo')
    .required('El salario es obligatorio'),

});

export const EmployeeValidationSchema = yup.object({
  name: yup
    .string()
    .required('El nombre es obligatorio'),
  lastName: yup
    .string()
    .required('El apellido es obligatorio'),
  age: yup
    .number()
    .min(18, 'La edad debe ser al menos 18')
    .required('La edad es obligatoria'),
  sexo: yup
    .string()
    .oneOf(['0', '1', '2', '3'], 'Sexo no válido') // 0 No especificado, 1 Masculino, 2 Femenino, 3 Otro
    .required('El sexo es obligatorio'),
  curp: yup
    .string()
    .matches(
      /^(([A-ZÑ&]{4})([0-9]{2})([0][13578]|[1][02])(([0][1-9]|[12][\d])|[3][01])([A-Z0-9]{3}))|(([A-ZÑ&]{4})([0-9]{2})([0][13456789]|[1][012])(([0][1-9]|[12][\d])|[3][0])([A-Z0-9]{3}))|(([A-ZÑ&]{4})([02468][048]|[13579][26])[0][2]([0][1-9]|[12][\d])([A-Z0-9]{3}))|(([A-ZÑ&]{4})([0-9]{2})[0][2]([0][1-9]|[1][0-9]|[2][0-8])([A-Z0-9]{3}))$/,
      'CURP no válido'
    )
    .required('La CURP es obligatoria'),
  rfc: yup
    .string()
    .matches(/^^(([A-ZÑ&]{4})([0-9]{2})([0][13578]|[1][02])(([0][1-9]|[12][\\d])|[3][01])([A-Z0-9]{3}))|(([A-ZÑ&]{4})([0-9]{2})([0][13456789]|[1][012])(([0][1-9]|[12][\\d])|[3][0])([A-Z0-9]{3}))|(([A-ZÑ&]{4})([02468][048]|[13579][26])[0][2]([0][1-9]|[12][\\d])([A-Z0-9]{3}))|(([A-ZÑ&]{4})([0-9]{2})[0][2]([0][1-9]|[1][0-9]|[2][0-8])([A-Z0-9]{3}))$/, 'RFC no válido') // Validación para RFC
    .required('El RFC es obligatorio'),
  salary: yup
    .string()
    .matches(/^\d+(\.\d{1,2})?$/, 'El salario debe ser un número válido y positivo')
    .required('El salario es obligatorio'),

});


export const ConfigValidationSchema = yup.object(
  {
    config: yup.string().nullable(),
  }
);
export const DiscordValidationSchema = yup.object({
  config: yup
    .string()
    .nullable()
    .matches(
      /^https:\/\/(discord(?:app)?\.com)\/api\/webhooks\/\d+\/[\w-]+$/,
      'No es una URL válida de Discord webhook',
    ),
})

export const SlackValidationSchema = yup.object({
  config: yup
    .string()
    .nullable()
    .matches(
      /^https:\/\/hooks\.slack\.com\/services\/[A-Za-z0-9]+\/[A-Za-z0-9]+\/[A-Za-z0-9]+$/,
      'No es una URL válida de Slack webhook',
    ),
})

export const SMTPConfigValidationSchema = yup.object({
  config: yup
    .string()
    .nullable()
    .matches(
      /^(smtp:\/\/[A-Za-z0-9]+:[A-Za-z0-9]+@[A-Za-z0-9.-]+:[0-9]+|smtp\.[A-Za-z0-9.-]+\.[A-Za-z]{2,})$/i,
      'No es una URL válida de SMTP',
    ),

})