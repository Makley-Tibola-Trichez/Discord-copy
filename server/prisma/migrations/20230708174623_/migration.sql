/*
  Warnings:

  - You are about to drop the column `inviteStatus` on the `Friendship` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Friendship" DROP COLUMN "inviteStatus",
ADD COLUMN     "status" INTEGER NOT NULL DEFAULT 0;
