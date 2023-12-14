import { PostTag } from '@prisma/client';
import z from 'zod'

export const SchemaLogin = z.object({
    email: z.string().min(1,{ message: 'need a username' }),
    password: z.string().min(8, { message: 'at least 8 characters long' })
    .regex(/[A-Za-z]/, { message: ' must contain at least one letter' })
    .regex(/[0-9]/, { message: ' must contain at least one digit' })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, { message: '  at least one special character' }),
  });
  
  export interface FormDataRegister {
    email: string;
    password: string;
    username: string;
  }

  
  
  
  export const schemaProfile = z.object({
    firstname: z.string().min(1, { message: 'cant be empty' }),
    lastname: z.string().min(1, { message: 'cant be empty' }),
    email: z.string().email({ message: 'Invalid email format' }),
    });


export const SchemaRegister = z.object({
email: z.string().email().min(1,{ message: 'need a email' }),
name: z.string().min(1,{ message: 'need a first name' }),
password: z.string().min(8, { message: 'at least 8 characters long' })
.regex(/[A-Za-z]/, { message: ' must contain at least one letter' })
.regex(/[0-9]/, { message: ' must contain at least one digit' })
.regex(/[!@#$%^&*(),.?":{}|<>]/, { message: '  at least one special character' }),
});



export const AddTask = z.object({
title: z.string().min(1,{ message: 'need a email' }),
description: z.string().min(1,{ message: 'need a email' }),
subtaskArray: z.array(z.string()),
});




export type Post = {
  id: string;
  userId: string;
  imageUrl: string;
  caption: string | null;
  location: string | null;
  postedAt: Date;
  comments:   Comment[]
  likes  :     Like[]
  tags :       PostTag[]
  taggedUsers :UserTag[]
  user:User
};

export type User = {
  id: string;
  username: string;
  email: string;
  fullName: string | null;
  bio: string | null;
  profilePictureUrl: string | null;
  avatarkey: string | null;
  isPrivate: boolean;
  joinedAt: Date;
  isEmailVerified: boolean;
  posts: Post[];
  following: following[]
  followers:followers[]
};

export type following= {
  id: string;
  userId:string;
  followingId: string;
  followedAt: Date;
};
export type followers= {
  id: string;
  followerId: string;
  followedAt: Date;
  userId:string;
};



const CommentSchema = z.object({
    id: z.string(),
    postId: z.string(),
    userId: z.string(),
    content: z.string(),
    repliedToCommentId: z.string().nullable(),
    commentedAt: z.date(),
    // Add any nested relations if necessary
});



const LikeSchema = z.object({
    postId: z.string(),
    userId: z.string(),
    likedAt: z.date(),
});

const FollowerSchema = z.object({
    id: z.string(),
    followerId: z.string().optional(),
    followedAt: z.date().optional(),
    userId:z.string()
});
const FollowingSchema = z.object({
    id: z.string(),
    followingId: z.string().optional(),
    followedAt: z.date().optional(),
    userId:z.string()
});

const TagSchema = z.object({
    id: z.string(),
    name: z.string(),
    // Add relation to PostTag if necessary
});

const ConversationSchema = z.object({
    id: z.string(),
    redisKey: z.string(),
    initiatorId: z.string(),
    recipientId: z.string(),
    // Add more fields as needed
});

const NotificationSchema = z.object({
    id: z.string(),
    userId: z.string(),
    type: z.string(),
    referenceId: z.number(),
    isRead: z.boolean(),
    createdAt: z.date(),
});

const StorySchema = z.object({
    id: z.string(),
    userId: z.string(),
    imageUrl: z.string(),
    caption: z.string().nullable(),
    createdAt: z.date(),
    expiresAt: z.date(),
});

const UserTagSchema = z.object({
    postId: z.string(),
    userId: z.string(),
    // Add more fields as needed
});
const PostSchema = z.object({
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
    bio: z.string().nullable(),
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
})
  // Consider adding other fields like comments, likes, tags, etc.
});
export const UserSchema = z.object({
    id: z.string(),
    username: z.string(),
    email: z.string(),
    gender:z.string().nullable().optional(),
    fullName: z.string().nullable(),
    bio: z.string().nullable(),
    avatarkey: z.string().nullable(),
    profilePictureUrl: z.string().optional().nullable(),
    isPrivate: z.boolean(),
    joinedAt: z.date(),
    isEmailVerified: z.boolean(),
    posts: z.array(PostSchema),
    following: z.array(FollowingSchema).optional(),
    followers: z.array(FollowerSchema).optional(),
    comments: z.array(CommentSchema).optional(),
    likes: z.array(LikeSchema).optional(),
    initiatedConversations: z.array(ConversationSchema).optional(),
    receivedConversations: z.array(ConversationSchema).optional(),
    notifications: z.array(NotificationSchema).optional(),
    taggedPosts: z.array(UserTagSchema).optional(),
});


// Export TypeScript types
export type Usered = z.infer<typeof UserSchema>;
export type Posted = z.infer<typeof PostSchema>;
export type Comment = z.infer<typeof CommentSchema>;
export type Like = z.infer<typeof LikeSchema>;
export type Follower = z.infer<typeof FollowerSchema>;
export type Tag = z.infer<typeof TagSchema>;
export type Conversation = z.infer<typeof ConversationSchema>;
export type Notification = z.infer<typeof NotificationSchema>;
export type Story = z.infer<typeof StorySchema>;
export type UserTag = z.infer<typeof UserTagSchema>;
