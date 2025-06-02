/*
  Warnings:

  - You are about to drop the column `languages` on the `UserSettings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserSettings" DROP COLUMN "languages",
ADD COLUMN     "Applanguage" TEXT NOT NULL DEFAULT 'fr_FR';
