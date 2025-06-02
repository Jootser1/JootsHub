/*
  Warnings:

  - You are about to drop the column `enabled` on the `UserQuestionPreference` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Opinion" AS ENUM ('DISLIKE', 'NEUTRAL', 'LIKE');

-- AlterTable
ALTER TABLE "UserQuestionPreference" DROP COLUMN "enabled",
ADD COLUMN     "Opinion" "Opinion" NOT NULL DEFAULT 'NEUTRAL';
