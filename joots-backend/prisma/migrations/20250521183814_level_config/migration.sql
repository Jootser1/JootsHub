/*
  Warnings:

  - You are about to drop the column `ProgressPoint` on the `Conversation` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('easy', 'intermediate', 'hardcore');

-- AlterTable
ALTER TABLE "Conversation" DROP COLUMN "ProgressPoint",
ADD COLUMN     "xpPoint" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "LevelingConfig" (
    "id" SERIAL NOT NULL,
    "level" INTEGER NOT NULL,
    "difficulty" "Difficulty" NOT NULL,
    "xpRequired" INTEGER NOT NULL,
    "questionCount" INTEGER NOT NULL,
    "reward" TEXT,
    "photoRevealPercent" INTEGER,

    CONSTRAINT "LevelingConfig_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LevelingConfig_level_difficulty_key" ON "LevelingConfig"("level", "difficulty");
