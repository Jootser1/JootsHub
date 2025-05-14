/*
  Warnings:

  - The primary key for the `CategoryTranslation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `locale` column on the `CategoryTranslation` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `locale` column on the `Question` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `locale` column on the `QuestionOption` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "LocaleCode" AS ENUM ('fr_FR', 'en_US');

-- AlterTable
ALTER TABLE "CategoryTranslation" DROP CONSTRAINT "CategoryTranslation_pkey",
DROP COLUMN "locale",
ADD COLUMN     "locale" "LocaleCode" NOT NULL DEFAULT 'fr_FR',
ADD CONSTRAINT "CategoryTranslation_pkey" PRIMARY KEY ("categoryId", "locale");

-- AlterTable
ALTER TABLE "Conversation" ADD COLUMN     "locale" "LocaleCode" NOT NULL DEFAULT 'fr_FR';

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "locale",
ADD COLUMN     "locale" "LocaleCode" NOT NULL DEFAULT 'fr_FR';

-- AlterTable
ALTER TABLE "QuestionOption" DROP COLUMN "locale",
ADD COLUMN     "locale" "LocaleCode" NOT NULL DEFAULT 'fr_FR';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "languages" TEXT[] DEFAULT ARRAY['fr_FR']::TEXT[];

-- CreateIndex
CREATE UNIQUE INDEX "Question_groupId_locale_key" ON "Question"("groupId", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "QuestionOption_groupId_locale_order_key" ON "QuestionOption"("groupId", "locale", "order");
