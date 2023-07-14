import { z } from 'zod';

export const friendsListSchema = z.array(
  z.object({
    friendID: z.string().uuid(),
    name: z.string(),
    friendshipID: z.string().uuid(),
  }),
);
