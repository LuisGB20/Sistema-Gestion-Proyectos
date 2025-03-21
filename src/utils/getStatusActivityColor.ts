export const getStatusACtivityColor = (status: string) => {
    switch (status) {
        case 'BEGIN':
            return 'bg-yellow-100 text-yellow-800';
        case 'ON_HOLD':
            return 'bg-blue-100 text-blue-800';
        case 'CANCELED':
            return 'bg-green-100 text-green-800';
        case 'COMPLETED':
            return 'bg-green-100 text-green-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
};