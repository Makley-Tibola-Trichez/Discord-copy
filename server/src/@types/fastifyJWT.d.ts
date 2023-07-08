import { JWTSchemaType } from '../schemas/jwt.schemas';

declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: JWTSchemaType;
  }
}
