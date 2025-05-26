/*
  Warnings:

  - The values [easy,intermediate,hardcore] on the enum `Difficulty` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `level` on the `Conversation` table. All the data in the column will be lost.
  - You are about to drop the column `questionCount` on the `LevelingConfig` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "AttributeKey" AS ENUM ('CITY', 'AGE', 'GENDER', 'JOB', 'ORIGIN', 'ORIENTATION', 'PASSIONS', 'QUALITY', 'FLAW');

-- AlterEnum
BEGIN;
CREATE TYPE "Difficulty_new" AS ENUM ('EASY', 'INTERMEDIATE', 'HARDCORE');
ALTER TABLE "LevelingConfig" ALTER COLUMN "difficulty" TYPE "Difficulty_new" USING ("difficulty"::text::"Difficulty_new");
ALTER TYPE "Difficulty" RENAME TO "Difficulty_old";
ALTER TYPE "Difficulty_new" RENAME TO "Difficulty";
DROP TYPE "Difficulty_old";
COMMIT;

-- AlterTable
ALTER TABLE "Conversation" DROP COLUMN "level";

-- AlterTable
ALTER TABLE "LevelingConfig" DROP COLUMN "questionCount";

-- CreateTable
CREATE TABLE "UserAttribute" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "key" "AttributeKey" NOT NULL,
    "value" TEXT NOT NULL,
    "levelRevealed" INTEGER NOT NULL,

    CONSTRAINT "UserAttribute_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "UserAttribute_userId_idx" ON "UserAttribute"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserAttribute_userId_key_key" ON "UserAttribute"("userId", "key");

-- AddForeignKey
ALTER TABLE "UserAttribute" ADD CONSTRAINT "UserAttribute_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
