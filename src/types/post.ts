import { z } from "zod";
import { UserSchemaPost } from ".";

export const CommentSchema = z.object({
  id: z.string(),
  postId: z.string(),
  userId: z.string(),
  content: z.string(),
  repliedToCommentId: z.string().nullable(),
  commentedAt: z.date(),
  user: z.object({
    id: z.string(),
    username: z.string(),
    profilePictureUrl: z.string().nullable().optional(),
    fullName: z.string().nullable(),
  }),
});

export const LikeSchema = z.object({
  postId: z.string(),
  userId: z.string(),
  likedAt: z.date(),
});
export const PostSchema = z.object({
    id: z.string(),
    userId: z.string(),
    imageUrl: z.string(),
    caption: z.string().nullable(),
    location: z.string().nullable(),
    postedAt: z.date(),
    likes: z.array(LikeSchema).optional(),
    comments: z.array(CommentSchema).optional(),
    user: z.lazy(() => UserSchemaPost).optional(),
  });
  