/*
  Warnings:

  - The values [FRIEND,BLOCKED] on the enum `InviteStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "InviteStatus_new" AS ENUM ('NO_STATUS', 'PENDING', 'ACCEPTED', 'REFUSED');
ALTER TABLE "Friendship" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Friendship" ALTER COLUMN "status" TYPE "InviteStatus_new" USING ("status"::text::"InviteStatus_new");
ALTER TYPE "InviteStatus" RENAME TO "InviteStatus_old";
ALTER TYPE "InviteStatus_new" RENAME TO "InviteStatus";
DROP TYPE "InviteStatus_old";
ALTER TABLE "Friendship" ALTER COLUMN "status" SET DEFAULT 'NO_STATUS';
COMMIT;

-- AlterTable
ALTER TABLE "Friendship" ADD COLUMN     "isBlocked" BOOLEAN NOT NULL DEFAULT false;
