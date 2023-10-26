import { z } from 'zod'

export const SchemaRegister = z.object({
  email: z.string().email().min(1,{ message: 'need a email' }),
  name: z.string().min(1,{ message: 'need a first name' }),
  password: z.string().min(8, { message: 'at least 8 characters long' })
  .regex(/[A-Za-z]/, { message: ' must contain at least one letter' })
  .regex(/[0-9]/, { message: ' must contain at least one digit' })
  .regex(/[!@#$%^&*(),.?":{}|<>]/, { message: '  at least one special character' }),
  });

export type RegisterRequest = z.infer<typeof SchemaRegister>

