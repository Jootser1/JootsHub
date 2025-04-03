/*
  Warnings:

  - You are about to drop the column `initiatorId` on the `Conversation` table. All the data in the column will be lost.
  - You are about to drop the column `receiverId` on the `Conversation` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Message` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "ConversationParticipant" (
    "conversationId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ConversationParticipant_pkey" PRIMARY KEY ("conversationId","userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "ConversationParticipant_conversationId_userId_key" ON "ConversationParticipant"("conversationId", "userId");

-- AddForeignKey
ALTER TABLE "ConversationParticipant" ADD CONSTRAINT "ConversationParticipant_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "Conversation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConversationParticipant" ADD CONSTRAINT "ConversationParticipant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Migration des données existantes
INSERT INTO "ConversationParticipant" ("conversationId", "userId")
SELECT id, "initiatorId" FROM "Conversation";

INSERT INTO "ConversationParticipant" ("conversationId", "userId")
SELECT id, "receiverId" FROM "Conversation";

-- DropForeignKey
ALTER TABLE "Conversation" DROP CONSTRAINT "Conversation_initiatorId_fkey";

-- DropForeignKey
ALTER TABLE "Conversation" DROP CONSTRAINT "Conversation_receiverId_fkey";

-- DropIndex
DROP INDEX "Conversation_initiatorId_receiverId_key";

-- AlterTable
ALTER TABLE "Conversation" DROP COLUMN "initiatorId",
DROP COLUMN "receiverId";

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "status";
