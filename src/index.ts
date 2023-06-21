import { AuthController } from './controllers/auth.controller';
import { fastify } from './lib/fastify';
import { ThrowFastifyListenError } from './errors/throwFastifyListenError';

fastify.register(() => {
  fastify.post('/auth/register', AuthController.register);
  fastify.post('/auth/login', AuthController.login);
  fastify.post('/auth/verify-token/', AuthController.verifyToken);
});

fastify.listen({ port: 8080 }, ThrowFastifyListenError);
