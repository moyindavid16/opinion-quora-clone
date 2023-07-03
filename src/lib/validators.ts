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

export const GetPostsValidator = z.array(
  z.object({
    id: z.string().cuid(),
    title: z.string().min(3),
    content: z.string().min(3),
    author: z.object({
      name: z.string(),
      image: z.string(),
    }),
    votes: z.optional(
      z.array(
        z.object({
          type: z.enum(["Up", "Down"]),
        }),
      ),
    ),
  }),
);

export const CreateQuestionValidator = z.object({
  userId: z.optional(z.string().cuid()),
  content: z.string().min(3),
});

export const VoteValidator = z.object({
  userId: z.optional(z.string().cuid()),
  postId: z.string().cuid(),
  type: z.enum(["Up", "Down"]),
});

export const CreateCommentValidator = z.object({
  userId: z.optional(z.string().cuid()),
  postId: z.string().cuid(),
  content: z.string().min(3),
});

export const GetCommentsValiator = z.array(
  z.object({
    author: z.object({image: z.string(), name: z.string()}),
    id: z.string().cuid(),
    userId: z.string().cuid(),
    postId: z.string().cuid(),
    content: z.string().min(3),
  }),
);

export type CreateSpaceType = z.infer<typeof CreateSpaceValidator>;
export type CreatePostType = z.infer<typeof CreatePostValidator>;
export type GetPostsType = z.infer<typeof GetPostsValidator>;
export type CreateQuestionType = z.infer<typeof CreateQuestionValidator>;
export type PostVoteType = z.infer<typeof VoteValidator>;
export type CreateCommentType = z.infer<typeof CreateCommentValidator>;
export type GetCommentsType = z.infer<typeof GetCommentsValiator>;
