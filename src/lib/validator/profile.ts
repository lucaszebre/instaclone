import { FollowerSchema, FollowingSchema, LikeSchema, TagSchema, UserTagSchema } from "@/types";
import { z } from "zod";






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
  

  
  export const PostSchema = z.object({
    id: z.string(),
    userId: z.string(),
    imageUrl: z.string(),
    caption: z.string().nullable(),
    location: z.string().nullable(),
    postedAt: z.date(),
    comments: z.array(CommentSchema),
    likes: z.array(LikeSchema),
    tags: z.array(TagSchema),
    taggedUsers: z.array(UserTagSchema),
    user: z.object({
      id: z.string(),
      username: z.string(),
      email: z.string(),
      fullName: z.string().nullable(),
    bio: z.string().nullable(),
    profilePictureUrl: z.string().nullable(),
    avatarkey: z.string().nullable(),
    isPrivate: z.boolean(),
    joinedAt: z.date(),
    isEmailVerified: z.boolean(),
    }),
  });
  
  export const ProfileValidator= z.object({
    id: z.string(),
    username: z.string(),
    email: z.string(),
    fullName: z.string().nullable(),
    bio: z.string().nullable(),
    profilePictureUrl: z.string().nullable(),
    avatarkey: z.string().nullable(),
    isPrivate: z.boolean(),
    joinedAt: z.date(),
    isEmailVerified: z.boolean(),
    posts: z.array(PostSchema),
    following: z.array(FollowingSchema).optional(),
    followers: z.array(FollowerSchema).optional(),
  });
  

  
  export type Profile = z.infer<typeof ProfileValidator>;