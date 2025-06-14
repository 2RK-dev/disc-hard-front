import { withService } from "@/services/with-service";
import { IUpdateMemberRole } from "@/services/member/types";

export const {UpdateMemberRole}: { UpdateMemberRole: IUpdateMemberRole } = await withService(
    () => import("./impl/mock"),
    () => import("./impl/real")
);