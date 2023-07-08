import { FastifyInstance } from 'fastify';
import { FriendshipController } from '../controllers/friendship.controller';

export async function friendsRoutes(fastify: FastifyInstance) {
  fastify.post('/friends/invite', FriendshipController.inviteNewFriend);
  fastify.get('/friends', FriendshipController.friends);
}
