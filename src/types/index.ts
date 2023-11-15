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




type Post = {
  id: string;
  userId: string;
  imageUrl: string;
  caption: string | null;
  location: string | null;
  postedAt: Date;
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
  followingId: string;
  followerId: string;
  followedAt: Date;
};
export type followers= {
  id: string;
  followingId: string;
  followerId: string;
  followedAt: Date;
};