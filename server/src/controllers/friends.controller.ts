import { FastifyReply, FastifyRequest } from 'fastify';
import { FriendshipRepository } from '../repository/friendship.repository';
import { friendsListSchema } from '../schemas/friends.schemas';
import { FriendsRepository } from '../repository/friends.repository';

export class FriendsController {
  constructor() {
    throw new Error(`class ${this.constructor.name}`);
  }

  static async friends(request: FastifyRequest, reply: FastifyReply) {
    const _friendsList = await FriendsRepository.listAllFriends(
      request.user.user.userID,
    );

    const _parsedFriendsList = friendsListSchema.parse(_friendsList);

    return _parsedFriendsList;
  }
}
