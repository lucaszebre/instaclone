-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "savePostId" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "savePostId" TEXT;

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "conversationId" TEXT,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "Conversation"("id") ON DELETE SET NULL ON UPDATE CASCADE;
