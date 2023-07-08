import { z } from 'zod';

const _envs = z.object({
  SECRET_KEY: z.string(),
  DATABASE_URL: z.string(),
  MONGO_DB: z.string(),
});

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof _envs> {}
  }
}
