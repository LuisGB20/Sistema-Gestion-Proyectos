import type { User } from "./User";

export interface ResponseAuthAPI {
    success: boolean,
    message: string,
    data: {
        user: User,
        token: string
    },
}