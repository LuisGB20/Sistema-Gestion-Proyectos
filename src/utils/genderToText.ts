import { Gender } from "@/data/enums";

export const genderToText = (gender: Gender): string => {
    const genderMap: Record<Gender, string> = {
        [Gender.NO_ESPECIFICADO]: "No especificado",
        [Gender.MASCULINO]: "Masculino",
        [Gender.FEMENINO]: "Femenino",
        [Gender.OTRO]: "Otro"
    };
    return genderMap[gender] || "Desconocido";
}
