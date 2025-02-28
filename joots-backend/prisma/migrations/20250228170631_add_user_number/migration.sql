/*
  Warnings:

  - A unique constraint covering the columns `[userNumber]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "userNumber" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_userNumber_key" ON "User"("userNumber");
