import { StatusActivity } from "@/data/enums";


export const translateStatusActivity = (status: StatusActivity | string): string => {
    switch (status) {
        case StatusActivity.BEGIN:
            return "En Desarrollo";
        case StatusActivity.ON_HOLD:
            return "En Pausa";
        case StatusActivity.CANCELED:
            return "Cancelada";
        case StatusActivity.COMPLETED:
            return "Completada";
        default:
            return status;
    }
}
