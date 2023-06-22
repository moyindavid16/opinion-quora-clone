import {z} from "zod";

export const CreateSpaceValidator = z.object({
  userId: z.optional(z.string().cuid()),
  name: z.string().min(3),
  desc: z.string(),
});

export type CreateSpaceType = z.infer<typeof CreateSpaceValidator>
