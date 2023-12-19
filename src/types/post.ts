import { z } from "zod";
import { LikeSchema, CommentSchema,  UserSchemaPost } from ".";

export const PostSchema = z.object({
    id: z.string(),
    userId: z.string(),
    imageUrl: z.string(),
    caption: z.string().nullable(),
    location: z.string().nullable(),
    postedAt: z.date(),
    likes: z.array(LikeSchema).optional(),
    comments: z.array(CommentSchema).optional(),
    user: UserSchemaPost.optional(),
  });
  