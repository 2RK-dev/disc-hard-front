import z from "zod";

export const PageSchema = z.object({
    size: z.number(),
    totalElements: z.number(),
    totalPages: z.number(),
    number: z.number(),
});
