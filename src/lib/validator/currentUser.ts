// include: {
//   posts:{include:{
//     user:true,
//     likes:true,
//     comments:{
//       include:{
//         user:true
//       }
//     },
//     taggedUsers:true,
//     tags:true
//   }},
//   followers:true,
//   following:true,

//   },


import { FollowingSchema, FollowerSchema, CommentSchema, LikeSchema, ConversationSchema, NotificationSchema, UserTagSchema, UserSchema, UserSchemaPost } from '@/types'
import { z } from 'zod'

export const PostSchema = z.object({
  id: z.string(),
  userId: z.string(),
  imageUrl: z.string(),
  caption: z.string().nullable(),
  location: z.string().nullable(),
  postedAt: z.date(),
  likes: z.array(LikeSchema).optional(),
  comments: z.array(CommentSchema).optional(),
  user: UserSchema,
});



export const CurrentUserValidator = z.object({
    id: z.string(),
    username: z.string(),
    email: z.string(),
    gender: z.string().nullable().optional(),
    fullName: z.string().nullable(),
    bio: z.string().nullable(),
    avatarkey: z.string().nullable(),
    profilePictureUrl: z.string().optional().nullable(),
    isPrivate: z.boolean(),
    joinedAt: z.date(),
    isEmailVerified: z.boolean(),
    following: z.array(FollowingSchema).optional(),
    posts: z.array(PostSchema).optional(),
    followers: z.array(FollowerSchema).optional(),
    comments: z.array(CommentSchema).optional(),
    likes: z.array(LikeSchema).optional(),
    initiatedConversations: z.array(ConversationSchema).optional(),
    receivedConversations: z.array(ConversationSchema).optional(),
    notifications: z.array(NotificationSchema).optional(),
    taggedPosts: z.array(UserTagSchema).optional(),
  });
 
  
  export type Usered = z.infer<typeof CurrentUserValidator>;