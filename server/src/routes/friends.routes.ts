import { FastifyInstance } from 'fastify';
import { FriendsController } from '../controllers/friends.controller';

export async function friendsRoutes(fastify: FastifyInstance) {
  fastify.get('/friends', FriendsController.friends);
}
