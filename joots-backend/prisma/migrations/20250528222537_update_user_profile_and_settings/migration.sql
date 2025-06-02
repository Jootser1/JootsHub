/*
  Warnings:

  - You are about to drop the column `avatar` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `bio` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `isAvailableForChat` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `languages` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `LevelingConfig` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "AttributeKey" ADD VALUE 'PICTURE';
ALTER TYPE "AttributeKey" ADD VALUE 'BIO';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "avatar",
DROP COLUMN "bio",
DROP COLUMN "isAvailableForChat",
DROP COLUMN "languages";

-- AlterTable
ALTER TABLE "UserQuestionPreference" ADD COLUMN     "userSettingsId" TEXT;

-- DropTable
DROP TABLE "LevelingConfig";

-- CreateTable
CREATE TABLE "UserSettings" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "languages" TEXT NOT NULL DEFAULT 'fr_FR',
    "acceptedLanguages" TEXT[] DEFAULT ARRAY['fr_FR']::TEXT[],
    "isAvailableForChat" BOOLEAN NOT NULL DEFAULT true,
    "allowInvitationsFromStrangers" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "UserSettings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserSettings_userId_key" ON "UserSettings"("userId");

-- AddForeignKey
ALTER TABLE "UserSettings" ADD CONSTRAINT "UserSettings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserQuestionPreference" ADD CONSTRAINT "UserQuestionPreference_userSettingsId_fkey" FOREIGN KEY ("userSettingsId") REFERENCES "UserSettings"("id") ON DELETE SET NULL ON UPDATE CASCADE;
