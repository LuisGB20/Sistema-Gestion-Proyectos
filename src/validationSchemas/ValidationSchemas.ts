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

export const ConfigValidationSchema = yup.object({
  config: yup.string().nullable(),
})
