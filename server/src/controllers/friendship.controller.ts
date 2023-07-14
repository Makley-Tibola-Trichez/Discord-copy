import { FastifyReply, FastifyRequest } from 'fastify';
import { FriendshipRepository } from '../repository/friendship.repository';
import {
  acceptInviteBodySchema,
  blockFriendBodySchema,
  declineInviteBodySchema,
  inviteNewFriendBodySchema,
  unblockFriendBodySchema,
  undoFriendshipSchema,
} from '../schemas/friendship.schemas';
import { z } from 'zod';

export class FriendshipController {
  constructor() {
    throw new Error(`class ${this.constructor.name}`);
  }

  static async inviteNewFriend(request: FastifyRequest, reply: FastifyReply) {
    const _inviteUserBody = inviteNewFriendBodySchema.parse(request.body);

    const _newFriendshipID = await FriendshipRepository.inviteNewFriend(
      request.user.user.userID,
      _inviteUserBody.inviteUserID,
    );

    if (_newFriendshipID === null) {
      reply.statusCode = 405;

      return { message: 'Already a Friend' };
    }
    return { friendshipID: _newFriendshipID };
  }

  static async blockFriend(request: FastifyRequest, reply: FastifyReply) {
    const _parsedBody = blockFriendBodySchema.parse(request.body);

    await FriendshipRepository.blockFriend(_parsedBody.friendshipID);
  }

  static async unblockFriend(request: FastifyRequest, reply: FastifyReply) {
    const _parsedBody = unblockFriendBodySchema.parse(request.body);

    await FriendshipRepository.unblockFriend(_parsedBody.friendshipID);
  }

  static async acceptInvite(request: FastifyRequest, reply: FastifyReply) {
    const _parsedBody = acceptInviteBodySchema.parse(request.params);

    await FriendshipRepository.acceptInvite(_parsedBody.friendshipID);
  }

  static async declineInvite(request: FastifyRequest, reply: FastifyReply) {
    const _parsedBody = declineInviteBodySchema.parse(request.body);

    await FriendshipRepository.declineInvite(_parsedBody.friendshipID);
  }

  static async undoFriendship(request: FastifyRequest, reply: FastifyReply) {
    const _parsedBody = undoFriendshipSchema.parse(request.body);

    await FriendshipRepository.undoFriendship(_parsedBody.friendshipID);
  }
}
