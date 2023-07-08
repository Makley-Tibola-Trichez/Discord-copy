import { FastifyInstance } from 'fastify';
import { AuthController } from '../controllers/auth.controller';

export async function authRoutes(fastify: FastifyInstance) {
  fastify.post('/auth/register', AuthController.createUser);
  fastify.post('/auth/login', AuthController.login);
  fastify.post('/auth/verify-token', AuthController.verifyToken);
}
