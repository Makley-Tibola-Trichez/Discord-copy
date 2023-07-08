import { FastifyReply, FastifyRequest } from 'fastify';
import { FriendsRepository } from '../repository/friends.repository';
import {
  friendInviteSchema,
  friendsListSchema,
} from '../schemas/friends.schemas';

export class FriendshipController {
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
  static async inviteNewFriend(request: FastifyRequest, reply: FastifyReply) {
    const _inviteUserBody = friendInviteSchema.parse(request.body);

    const _newFriendshipID = await FriendsRepository.inviteNewFriend(
      request.user.user.userID,
      _inviteUserBody.inviteUserID,
    );

    if (_newFriendshipID === null) {
      reply.statusCode = 405;

      return { message: 'Already a Friend' };
    }
    return { friendshipID: _newFriendshipID };
  }
}
