-- CreateTable
CREATE TABLE "UserQuestionPreference" (
    "userId" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserQuestionPreference_pkey" PRIMARY KEY ("userId","categoryId")
);

-- CreateIndex
CREATE INDEX "UserQuestionPreference_categoryId_idx" ON "UserQuestionPreference"("categoryId");

-- AddForeignKey
ALTER TABLE "UserQuestionPreference" ADD CONSTRAINT "UserQuestionPreference_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserQuestionPreference" ADD CONSTRAINT "UserQuestionPreference_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
