/*
  Warnings:

  - You are about to drop the column `follower` on the `FollowerList` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,followerId]` on the table `FollowerList` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,followingId]` on the table `FollowingList` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `followerId` to the `FollowerList` table without a default value. This is not possible if the table is not empty.
  - Added the required column `followingId` to the `FollowingList` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FollowerList" DROP COLUMN "follower",
ADD COLUMN     "followedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "followerId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "FollowingList" ADD COLUMN     "followingId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "FollowerList_userId_followerId_key" ON "FollowerList"("userId", "followerId");

-- CreateIndex
CREATE UNIQUE INDEX "FollowingList_userId_followingId_key" ON "FollowingList"("userId", "followingId");
