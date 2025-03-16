import * as yup from 'yup';

export const ResourceValidationSchema = yup.object(
    {
        name: yup.string().required('El nombre es obligatorio'),
        description: yup.string().required('La descripción es obligatoria'),
        quantity: yup
            .number()
            .required('La cantidad es obligatoria')
            .min(1, 'La cantidad debe ser al menos 1')
            .max(1000, 'La cantidad no puede exceder 1000'),
    }
);