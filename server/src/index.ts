import { authRoutes } from './routes/auth.routes';
import { ThrowFastifyListenError } from './errors/throwFastifyListenError';
import { fastify, route } from './lib/fastify';
import { friendsRoutes } from './routes/friends.routes';

route.public(authRoutes);
route.private(friendsRoutes);

fastify.listen({ port: 8080 }, ThrowFastifyListenError);
