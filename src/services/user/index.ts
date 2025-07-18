import { IUser } from "./types";
import { withService } from "@/services/with-service";

export const {getUsers, getUserWithoutTheseUsers, login, register}: IUser = await withService(
    () => import("./impl/mock"),
    () => import("./impl/real")
)