//post
//  include:{
//     comments:true,
//     likes:true,
//     user:true,
//     
// },
// })


import { FollowingSchema, FollowerSchema, CommentSchema, LikeSchema, ConversationSchema, NotificationSchema, UserTagSchema, UserSchema, UserSchemaPost } from '@/types'
import { z } from 'zod'

export const GallerySchema = z.object({
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



 
  
  export type GalleryType = z.infer<typeof GallerySchema>;