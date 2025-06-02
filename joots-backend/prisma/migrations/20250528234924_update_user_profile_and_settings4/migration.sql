/*
  Warnings:

  - The values [PICTURE] on the enum `AttributeKey` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AttributeKey_new" AS ENUM ('CITY', 'AGE', 'GENDER', 'JOB', 'ORIGIN', 'ORIENTATION', 'PASSIONS', 'QUALITY', 'FLAW', 'BIO');
ALTER TABLE "UserAttribute" ALTER COLUMN "key" TYPE "AttributeKey_new" USING ("key"::text::"AttributeKey_new");
ALTER TYPE "AttributeKey" RENAME TO "AttributeKey_old";
ALTER TYPE "AttributeKey_new" RENAME TO "AttributeKey";
DROP TYPE "AttributeKey_old";
COMMIT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "avatar" TEXT;
