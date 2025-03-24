export const getStatusActivityColor = (status: string) => {
    switch (status) {
        case 'BEGIN':
            return 'bg-yellow-300 text-yellow-900';  // Mejor contraste para el estado 'BEGIN'
        case 'ON_HOLD':
            return 'bg-indigo-300 text-indigo-900'; // Cambié el azul a índigo para un toque más vibrante
        case 'CANCELED':
            return 'bg-red-300 text-red-900';  // Rojo para indicar que la actividad está cancelada
        case 'COMPLETED':
            return 'bg-green-300 text-green-900';  // Verde más intenso para indicar que está completado
        default:
            return 'bg-gray-200 text-gray-900';  // Gris más claro y más contrastado
    }
};
