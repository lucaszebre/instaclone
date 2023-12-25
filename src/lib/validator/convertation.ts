

import { UserSchema } from '@/types';
import { z } from 'zod'
import { messageValidator } from './message';





export const ConversationValidator = z.object({
    id: z.string(),
    redisKey: z.string(),
    initiatorId: z.string(),
    initiator: UserSchema.nullable().optional(),
    recipientId: z.string(),
    recipient: UserSchema.nullable().optional(),
    messages:messageValidator.nullable().optional()
});


export type Conversation = z.infer<typeof ConversationValidator>;