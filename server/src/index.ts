import { AuthController } from './controllers/auth.controller';
import { fastify } from './lib/fastify';
import { ThrowFastifyListenError } from './errors/throwFastifyListenError';
import { isAuthenticated } from './hooks/isAuthenticated';
import { FriendshipController } from './controllers/friendship.controller';

fastify.register((fastifyPrivate, opts, done) => {
  fastifyPrivate.addHook('preHandler', isAuthenticated);
  fastifyPrivate.post('/newFriendInvite', FriendshipController.newFriendInvite);
  done();
});

fastify.register((fastifyPublic, opts, done) => {
  fastifyPublic.post('/auth/register', AuthController.register);
  fastifyPublic.post('/auth/login', AuthController.login);
  fastifyPublic.post('/auth/verify-token/', AuthController.verifyToken);
  done();
});

fastify.listen({ port: 8080 }, ThrowFastifyListenError);
