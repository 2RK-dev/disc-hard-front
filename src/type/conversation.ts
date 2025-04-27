import {z} from "zod";
import {UserSchema} from "@/type/User";

export const ParticipantSchema = z.object({
    id: z.number(),
    alias: z.string(),
    user: UserSchema.partial().optional(),
});

export type Participant = z.infer<typeof ParticipantSchema>;