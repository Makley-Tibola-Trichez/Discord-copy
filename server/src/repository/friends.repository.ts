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
}
