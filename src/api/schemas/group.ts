import z from "zod";

export const GroupInviteSchema = z.object({
    userIds: z.array(z.string()),
});

export const CreateGroupSchema = z.object({
    name: z.string(),
    description: z.string(),
    members: z.array(z.string()),
})