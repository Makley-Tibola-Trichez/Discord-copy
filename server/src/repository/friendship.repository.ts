import { PrismaConnectDisconnect } from '../decorators/prismaConnectDisconnect';
import { prisma } from '../lib/prisma';
import { InviteStatus } from '@prisma/client';

export class FriendshipRepository {
  @PrismaConnectDisconnect
  static async inviteNewFriend(userID: string, invitedUserID: string) {
    const _userFriendship = await prisma.friendship.findFirst({
      select: {
        friendshipID: true,
        inviteStatus: true,
      },
      where: {
        OR: [
          {
            userID: invitedUserID,
            friendID: userID,
          },
          {
            userID: userID,
            friendID: invitedUserID,
          },
        ],
      },
    });
    if (_userFriendship?.inviteStatus === InviteStatus.ACCEPTED) {
      return null;
    }
    if (_userFriendship) {
      await prisma.friendship.update({
        data: {
          inviteStatus: InviteStatus.PENDING,
        },
        where: {
          friendshipID: _userFriendship.friendshipID,
        },
      });
    }

    const _newFriendshipID = await prisma.friendship.create({
      select: {
        friendshipID: true,
      },

      data: {
        userID: userID,
        friendID: invitedUserID,
        inviteStatus: InviteStatus.PENDING,
      },
    });

    return _newFriendshipID.friendshipID;
  }

  @PrismaConnectDisconnect
  static async blockFriend(friendshipID: string) {
    await prisma.friendship.update({
      data: {
        isBlocked: true,
      },
      where: {
        friendshipID,
      },
    });
  }

  @PrismaConnectDisconnect
  static async unblockFriend(friendshipID: string) {
    await prisma.friendship.update({
      data: {
        isBlocked: false,
      },
      where: {
        friendshipID,
      },
    });
  }

  @PrismaConnectDisconnect
  static async acceptInvite(friendshipID: string) {
    await prisma.friendship.update({
      data: {
        inviteStatus: InviteStatus.ACCEPTED,
      },
      where: {
        friendshipID,
      },
    });
  }

  @PrismaConnectDisconnect
  static async declineInvite(friendshipID: string) {
    await prisma.friendship.update({
      data: {
        inviteStatus: InviteStatus.REFUSED,
      },
      where: {
        friendshipID,
      },
    });
  }

  @PrismaConnectDisconnect
  static async undoFriendship(friendshipID: string) {
    await prisma.friendship.update({
      data: {
        inviteStatus: InviteStatus.NO_STATUS,
      },
      where: {
        friendshipID,
      },
    });
  }
}
