import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string().min(2),
  username: z.string().min(4),
  email: z.string().email(),
  password: z.string().min(8),
});
export type CreateUserSchema = z.infer<typeof createUserSchema>;

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
export type LoginSchema = z.infer<typeof loginSchema>;
