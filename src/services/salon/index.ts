import { withService } from "@/services/with-service";
import { ISalon } from "./types";

export const {
    addSalon,
    getMySalons,
    addMemberToSalon,
    getSalonById,
    sendMessage
}: ISalon = await withService(
    () => import("./impl/mock"),
    () => import("./impl/real")
);