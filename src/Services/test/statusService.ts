import axios from "axios";
import type { IStatusData } from '@/Interfaces/testStatus/IStatusData';

const constStatusData: Record<string, string> = {
    Api: 'TestApi',
    Api_1: 'TestApiI',
    Api_2: 'TestApiII',
};

// Función para obtener los datos de un servicio
export const getStatusData = async (serviceName: string): Promise<IStatusData | null> => {
    const apiname = constStatusData[serviceName];

    if (!apiname) {
        console.error('Nombre invalido');
        return null;
    }

    try {
        const response = await axios.get(`testStatus/${apiname}.json`);
        return response.data;
    } catch (error) {
        console.error('Error fetching status data:', error);
        return null;
    }
};

// Función para obtener la lista de servicios de forma dinámica
export const getServicesList = async (): Promise<Array<{ name: string }>> => {
    // Usamos Object.keys para obtener todos los nombres de los servicios disponibles en constStatusData
    const services = Object.keys(constStatusData).map((key) => ({ name: key }));

    return services;
};

