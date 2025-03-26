export const getStatusActivityColor = (status: string) => {
    switch (status) {
        case 'BEGIN':
            return 'bg-SteelBlue text-CharcoalBlue';
        case 'ON_HOLD':
            return 'bg-Gunmetal text-LightGray';
        case 'CANCELED':
            return 'bg-rojo-error text-white';
        case 'COMPLETED':
            return 'bg-DarkTeal text-white';
        default:
            return 'bg-LightGray text-CharcoalBlue';
    }
};
