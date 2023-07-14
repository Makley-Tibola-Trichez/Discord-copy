import { FastifyInstance } from 'fastify';
import { FriendshipController } from '../controllers/friendship.controller';

export async function friendshipRoutes(fastify: FastifyInstance) {
  fastify.post('/friendship/invite', FriendshipController.inviteNewFriend);

  fastify.patch(
    '/friendship/acceptInvite/:friendshipID',
    FriendshipController.acceptInvite,
  );
  fastify.patch(
    '/friendship/declineInvite/:friendshipID',
    FriendshipController.declineInvite,
  );
  fastify.patch(
    '/friendship/undoFriendship/:friendshipID',
    FriendshipController.undoFriendship,
  );
}
