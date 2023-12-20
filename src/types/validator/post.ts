import { z } from "zod";
import { CommentSchema, LikeSchema, UserSchema } from "..";






export const Gallery= z.object({
    id: z.string(),
    userId: z.string(),
    imageUrl: z.string(),
    caption: z.string().nullable(),
    location: z.string().nullable(),
    postedAt: z.date(),
    likes: z.array(LikeSchema).optional(),
    comments: z.array(CommentSchema).optional(),
    user:UserSchema
});


export type GalleryType = z.infer<typeof Gallery>;
