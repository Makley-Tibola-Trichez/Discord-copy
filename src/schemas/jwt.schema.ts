import { z } from 'zod';

export const parseJWT = z.object({
  user: z.object({
    email: z.string().email(),
    name: z.string(),
    userID: z.string().uuid(),
  }),
});

export type JWTSchemaType = z.infer<typeof parseJWT>;
