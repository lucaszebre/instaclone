/*
  Warnings:

  - You are about to drop the `Follower` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `author` on table `Post` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Follower" DROP CONSTRAINT "Follower_followerId_fkey";

-- DropForeignKey
ALTER TABLE "Follower" DROP CONSTRAINT "Follower_followingId_fkey";

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "author" SET NOT NULL,
ALTER COLUMN "author" SET DEFAULT 'kihura';

-- DropTable
DROP TABLE "Follower";

-- CreateTable
CREATE TABLE "FollowerList" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "FollowerList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FollowingList" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "FollowingList_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FollowerList" ADD CONSTRAINT "FollowerList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FollowingList" ADD CONSTRAINT "FollowingList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
