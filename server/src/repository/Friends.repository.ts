import { PrismaClientValidationError } from '@prisma/client/runtime';
import { PrismaConnectDisconnect } from '../decorators/prismaConnectDisconnect';
import { prisma } from '../lib/prisma';

export class FriendsRepository {
  @PrismaConnectDisconnect
  static async listAllFriends(userID: string) {
    const friendsList = await prisma.$queryRaw`
        SELECT
          "User"."userID" as "friendID",
          "User"."name",
          "Friendship"."friendshipID"
        FROM
          "User"
        LEFT JOIN "Friendship" ON
          "User"."userID" = "Friendship"."friendID"
        WHERE
          "Friendship"."userID" = ${userID}
        UNION
            SELECT
          "User"."userID",
          "User"."name",
          "Friendship"."friendshipID"
        FROM
          "User"
        LEFT JOIN "Friendship" ON
          "User"."userID" = "Friendship"."userID"
        WHERE
          "Friendship"."friendID" = ${userID}
          `;

    return friendsList;
  }

  @PrismaConnectDisconnect
  static async inviteNewFriend(userID: string, invitedUserID: string) {
    const _friendshipID = await prisma.friendship.findFirst({
      select: {
        friendshipID: true,
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

    if (_friendshipID !== null) {
      return null;
    }

    const _newFriendshipID = await prisma.friendship.create({
      select: {
        friendshipID: true,
      },

      data: {
        userID: userID,
        friendID: invitedUserID,
      },
    });

    return _newFriendshipID.friendshipID;
  }
}
