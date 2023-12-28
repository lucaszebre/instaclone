import { FollowingSchema, FollowerSchema, CommentSchema, LikeSchema, ConversationSchema, NotificationSchema, UserTagSchema } from '@/types'
import { z } from 'zod'

export const FeedValidator = z.object({
  page: z.number(),
  limit: z.number(),
  includeNonFollowed: z.boolean().optional()
})

export type FeedRequest = z.infer<typeof FeedValidator>

export const PostSchemaArray = z.array(z.object({
    id: z.string(),
    userId: z.string(),
    imageUrl: z.string(),
    caption: z.string().nullable(),
    location: z.string().nullable(),
    postedAt: z.date(),
    likes: z.array(z.object({
      postId: z.string(),
      userId: z.string(),
      likedAt: z.date(),
  })).optional(),
  comments:z.array(z.object({
    id: z.string(),
    postId: z.string(),
    userId: z.string(),
    content: z.string(),
    repliedToCommentId: z.string().nullable(),
    commentedAt: z.date(),
    // Add any nested relations if necessary
  })).optional(),
    user:z.object({
      id: z.string(),
      username: z.string(),
      email: z.string(),
      fullName: z.string().nullable(),
      bio: z.string().nullable().optional(),
      avatarkey: z.string().nullable(),
      profilePictureUrl: z.string().nullable(),
      isPrivate: z.boolean(),
      joinedAt: z.date(),
      isEmailVerified: z.boolean(),
      following: z.array(FollowingSchema).optional(),
      followers: z.array(FollowerSchema).optional(),
      comments: z.array(CommentSchema).optional(),
      likes: z.array(LikeSchema).optional(),
      initiatedConversations: z.array(ConversationSchema).optional(),
      receivedConversations: z.array(ConversationSchema).optional(),
      notifications: z.array(NotificationSchema).optional(),
      taggedPosts: z.array(UserTagSchema).optional(),
  })}))

  export type PostArray = z.infer<typeof PostSchemaArray>
