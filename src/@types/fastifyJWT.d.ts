import { JWTSchemaType } from '../schemas/jwt.schema';

declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: JWTSchemaType;
  }
}
