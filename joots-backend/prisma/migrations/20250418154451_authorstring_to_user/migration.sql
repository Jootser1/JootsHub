/*
  Warnings:

  - You are about to drop the column `author` on the `QuestionGroup` table. All the data in the column will be lost.
  - Added the required column `authorId` to the `QuestionGroup` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "QuestionGroup" DROP COLUMN "author",
ADD COLUMN     "authorId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "QuestionGroup" ADD CONSTRAINT "QuestionGroup_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
