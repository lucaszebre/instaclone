import { z } from "zod";

  
  export const SearchValidator= z.object({
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
  });
  

  
  export type Search= z.infer<typeof SearchValidator>;