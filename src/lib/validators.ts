import {z} from "zod";

export const CreateSpaceValidator = z.object({
  userId: z.optional(z.string().cuid()),
  name: z.string().min(3),
  desc: z.string(),
});

export const CreatePostValidator = z.object({
  userId: z.optional(z.string().cuid()),
  title: z.string().min(3),
  content: z.string().min(3),
});

export const CreateQuestionValidator = z.object({
  userId: z.optional(z.string().cuid()),
  content: z.string().min(3),
});


export type CreateSpaceType = z.infer<typeof CreateSpaceValidator>
export type CreatePostType = z.infer<typeof CreatePostValidator>
export type CreateQuestionType = z.infer<typeof CreateQuestionValidator>
