import { FastifyRequest, FastifyReply } from 'fastify';
import { JWTSchemaType } from '../schemas/jwt.schema';
import { prisma } from '../lib/prisma';
import { z } from 'zod';

export class FriendshipController {
  constructor() {
    throw new Error(`class ${this.constructor.name}`);
  }

  static async newFriendInvite(request: FastifyRequest, reply: FastifyReply) {
    const _parsedBody = z
      .object({
        inviteUserID: z.string().uuid(),
      })
      .parse(request.body);

    const _userInformation = request.user;

    await prisma.$connect();

    const _friendshipID = await prisma.friendship.findFirst({
      select: {
        friendshipID: true,
      },
      where: {
        OR: [
          {
            userID: _parsedBody.inviteUserID,
            friendID: request.user.user.userID,
          },
          {
            userID: request.user.user.userID,
            friendID: _parsedBody.inviteUserID,
          },
        ],
      },
    });

    if (_friendshipID) {
      await prisma.$disconnect();

      reply.statusCode = 405;

      return {
        message: 'Already a Friend',
      };
    }

    const _newFriendshipID = await prisma.friendship.create({
      select: {
        friendshipID: true,
      },

      data: {
        userID: _userInformation.user.userID,
        friendID: _parsedBody.inviteUserID,
      },
    });

    await prisma.$disconnect();

    return { friendshipID: _newFriendshipID };
  }
}
