import { StatusProject } from "@/data/enums";


export const translateStatus = (status: StatusProject | string): string => {
    switch (status) {
        case StatusProject.DEFINING:
            return "Definición";
        case StatusProject.PLANNING:
            return "Planificación";
        case StatusProject.ANALYSIS:
            return "Investigación";
        case StatusProject.DESIGN:
            return "Diseño";
        case StatusProject.DEVELOPMENT:
            return "Desarrollo";
        case StatusProject.ON_HOLD:
            return "En Pausa";
        case StatusProject.CANCELED:
            return "Cancelado";
        case StatusProject.COMPLETED:
            return "Completado";
        default:
            return status;
    }
}
