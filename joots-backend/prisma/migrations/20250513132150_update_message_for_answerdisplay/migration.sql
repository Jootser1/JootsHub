/*
  Warnings:

  - Added the required column `ProgressPoint` to the `Conversation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `level` to the `Conversation` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MessageType" AS ENUM ('TEXT', 'ANSWER');

-- AlterTable
ALTER TABLE "Conversation" ADD COLUMN     "ProgressPoint" INTEGER NOT NULL,
ADD COLUMN     "level" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "messageType" "MessageType" NOT NULL DEFAULT 'TEXT',
ADD COLUMN     "userAAnswer" TEXT,
ADD COLUMN     "userAId" TEXT,
ADD COLUMN     "userBAnswer" TEXT,
ADD COLUMN     "userBId" TEXT;

-- CreateIndex
CREATE INDEX "Message_messageType_idx" ON "Message"("messageType");
