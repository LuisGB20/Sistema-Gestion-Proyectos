//Interfaz aparte por la van a modificar ustedes con los datos que el api podria traer
export interface IStatusData {
    serviceName: string;
    uptimeData: { status: string }[];  // Array con objetos que tienen el campo status
    status: 'operational' | 'partial'; // Yo maneje 2 estados aqui
    uptime: string;
    details: {
        lastUpdated: string;
        uptimePercentage: string;
        today: string;
    };
}
