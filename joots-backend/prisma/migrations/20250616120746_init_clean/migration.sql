-- CreateEnum
CREATE TYPE "PollType" AS ENUM ('OPEN', 'MULTIPLE_CHOICE', 'CONTINUOUS', 'STEP_SCALE', 'STEP_LABELED', 'YES_NO_IDK');

-- CreateEnum
CREATE TYPE "AnswerSourceType" AS ENUM ('SOCIOSCOPY', 'CONVERSATION');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'LISTENER');

-- CreateEnum
CREATE TYPE "LocaleCode" AS ENUM ('fr_FR', 'en_US', 'es_ES');

-- CreateEnum
CREATE TYPE "MessageType" AS ENUM ('TEXT', 'ANSWER');

-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('EASY', 'INTERMEDIATE', 'HARDCORE');

-- CreateEnum
CREATE TYPE "Opinion" AS ENUM ('DISLIKE', 'NEUTRAL', 'LIKE');

-- CreateEnum
CREATE TYPE "AttributeKey" AS ENUM ('CITY', 'AGE', 'GENDER', 'JOB', 'ORIGIN', 'ORIENTATION', 'PASSIONS', 'QUALITY', 'FLAW', 'BIO');

-- CreateTable
CREATE TABLE "Auth" (
    "auth_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "access_token" TEXT,
    "refresh_token" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Auth_pkey" PRIMARY KEY ("auth_id")
);

-- CreateTable
CREATE TABLE "User" (
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "username" TEXT NOT NULL,
    "user_number" SERIAL NOT NULL,
    "avatar" TEXT,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_seen" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "role" "UserRole" NOT NULL DEFAULT 'USER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "UserAttribute" (
    "user_attribute_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,
    "key" "AttributeKey" NOT NULL,
    "value" TEXT NOT NULL,
    "level_revealed" INTEGER NOT NULL,

    CONSTRAINT "UserAttribute_pkey" PRIMARY KEY ("user_attribute_id")
);

-- CreateTable
CREATE TABLE "UserSettings" (
    "user_settings_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "app_language" TEXT NOT NULL DEFAULT 'fr_FR',
    "accepted_languages" TEXT[] DEFAULT ARRAY['fr_FR']::TEXT[],
    "is_available_for_chat" BOOLEAN NOT NULL DEFAULT true,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserSettings_pkey" PRIMARY KEY ("user_settings_id")
);

-- CreateTable
CREATE TABLE "UserContact" (
    "user_id" TEXT NOT NULL,
    "contact_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserContact_pkey" PRIMARY KEY ("user_id","contact_id")
);

-- CreateTable
CREATE TABLE "Conversation" (
    "conversation_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "locale" "LocaleCode" NOT NULL DEFAULT 'fr_FR',
    "xp_point" INTEGER NOT NULL DEFAULT 0,
    "difficulty" "Difficulty" NOT NULL DEFAULT 'INTERMEDIATE',

    CONSTRAINT "Conversation_pkey" PRIMARY KEY ("conversation_id")
);

-- CreateTable
CREATE TABLE "ConversationParticipant" (
    "conversation_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "has_given_answer" BOOLEAN NOT NULL DEFAULT false,
    "is_icebreaker_ready" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ConversationParticipant_pkey" PRIMARY KEY ("conversation_id","user_id")
);

-- CreateTable
CREATE TABLE "Message" (
    "message_id" TEXT NOT NULL,
    "sender_id" TEXT,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "conversation_id" TEXT NOT NULL,
    "is_read" BOOLEAN NOT NULL DEFAULT false,
    "edited_at" TIMESTAMP(3),
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("message_id")
);

-- CreateTable
CREATE TABLE "Poll" (
    "poll_id" TEXT NOT NULL,
    "type" "PollType" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_moderated" BOOLEAN NOT NULL DEFAULT false,
    "is_pinned" BOOLEAN NOT NULL DEFAULT false,
    "is_enabled" BOOLEAN NOT NULL DEFAULT true,
    "author_id" TEXT NOT NULL,

    CONSTRAINT "Poll_pkey" PRIMARY KEY ("poll_id")
);

-- CreateTable
CREATE TABLE "Category" (
    "category_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("category_id")
);

-- CreateTable
CREATE TABLE "PollCategory" (
    "poll_id" TEXT NOT NULL,
    "category_id" INTEGER NOT NULL,

    CONSTRAINT "PollCategory_pkey" PRIMARY KEY ("poll_id","category_id")
);

-- CreateTable
CREATE TABLE "PollTranslation" (
    "poll_translation_id" TEXT NOT NULL,
    "translation" TEXT NOT NULL,
    "locale" "LocaleCode" NOT NULL DEFAULT 'fr_FR',
    "poll_id" TEXT NOT NULL,

    CONSTRAINT "PollTranslation_pkey" PRIMARY KEY ("poll_translation_id")
);

-- CreateTable
CREATE TABLE "PollOption" (
    "poll_option_id" TEXT NOT NULL,
    "poll_id" TEXT NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "PollOption_pkey" PRIMARY KEY ("poll_option_id")
);

-- CreateTable
CREATE TABLE "PollOptionTranslation" (
    "id" TEXT NOT NULL,
    "option_id" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "translated_option_text" TEXT NOT NULL,

    CONSTRAINT "PollOptionTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PollScaleConstraint" (
    "poll_id" TEXT NOT NULL,
    "is_labeled" BOOLEAN NOT NULL DEFAULT false,
    "min_value" INTEGER NOT NULL,
    "max_value" INTEGER NOT NULL,
    "step_value" INTEGER,
    "min_label" TEXT,
    "max_label" TEXT,
    "mid_label" TEXT,

    CONSTRAINT "PollScaleConstraint_pkey" PRIMARY KEY ("poll_id")
);

-- CreateTable
CREATE TABLE "PollAnswer" (
    "poll_answer_id" TEXT NOT NULL,
    "poll_id" TEXT NOT NULL,
    "user_id" TEXT,
    "source_id" TEXT,
    "poll_option_id" TEXT,
    "opentext" TEXT,
    "numeric" DOUBLE PRECISION,
    "answered_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "comment" TEXT,
    "is_flagged" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PollAnswer_pkey" PRIMARY KEY ("poll_answer_id")
);

-- CreateTable
CREATE TABLE "PollAnswerSource" (
    "source_id" TEXT NOT NULL,
    "source_type" "AnswerSourceType" NOT NULL,
    "locale" "LocaleCode" NOT NULL,
    "conversation_id" TEXT,

    CONSTRAINT "PollAnswerSource_pkey" PRIMARY KEY ("source_id")
);

-- CreateTable
CREATE TABLE "UserCategoryPreference" (
    "user_id" TEXT NOT NULL,
    "category_id" INTEGER NOT NULL,
    "opinion" "Opinion" NOT NULL DEFAULT 'NEUTRAL',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_settings_id" TEXT,

    CONSTRAINT "UserCategoryPreference_pkey" PRIMARY KEY ("user_id","category_id")
);

-- CreateTable
CREATE TABLE "PollAnswerHistory" (
    "history_id" TEXT NOT NULL,
    "poll_answer_id" TEXT NOT NULL,
    "poll_option_id" TEXT NOT NULL,
    "answered_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "note" TEXT,
    "is_flagged" BOOLEAN NOT NULL DEFAULT false,
    "source_id" TEXT NOT NULL,

    CONSTRAINT "PollAnswerHistory_pkey" PRIMARY KEY ("history_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Auth_email_key" ON "Auth"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Auth_user_id_key" ON "Auth"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_user_number_key" ON "User"("user_number");

-- CreateIndex
CREATE INDEX "UserAttribute_user_id_idx" ON "UserAttribute"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "UserAttribute_user_id_key_key" ON "UserAttribute"("user_id", "key");

-- CreateIndex
CREATE UNIQUE INDEX "UserSettings_user_id_key" ON "UserSettings"("user_id");

-- CreateIndex
CREATE INDEX "UserContact_user_id_idx" ON "UserContact"("user_id");

-- CreateIndex
CREATE INDEX "UserContact_contact_id_idx" ON "UserContact"("contact_id");

-- CreateIndex
CREATE UNIQUE INDEX "ConversationParticipant_conversation_id_user_id_key" ON "ConversationParticipant"("conversation_id", "user_id");

-- CreateIndex
CREATE INDEX "Message_conversation_id_idx" ON "Message"("conversation_id");

-- CreateIndex
CREATE INDEX "Message_sender_id_idx" ON "Message"("sender_id");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE INDEX "PollCategory_poll_id_idx" ON "PollCategory"("poll_id");

-- CreateIndex
CREATE INDEX "PollCategory_category_id_idx" ON "PollCategory"("category_id");

-- CreateIndex
CREATE UNIQUE INDEX "PollTranslation_poll_id_locale_key" ON "PollTranslation"("poll_id", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "PollOptionTranslation_option_id_locale_key" ON "PollOptionTranslation"("option_id", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "PollAnswer_source_id_key" ON "PollAnswer"("source_id");

-- CreateIndex
CREATE INDEX "PollAnswer_user_id_idx" ON "PollAnswer"("user_id");

-- CreateIndex
CREATE INDEX "PollAnswer_poll_id_idx" ON "PollAnswer"("poll_id");

-- CreateIndex
CREATE UNIQUE INDEX "PollAnswer_poll_id_user_id_key" ON "PollAnswer"("poll_id", "user_id");

-- CreateIndex
CREATE INDEX "UserCategoryPreference_category_id_idx" ON "UserCategoryPreference"("category_id");

-- CreateIndex
CREATE INDEX "UserCategoryPreference_user_id_idx" ON "UserCategoryPreference"("user_id");

-- CreateIndex
CREATE INDEX "PollAnswerHistory_poll_answer_id_idx" ON "PollAnswerHistory"("poll_answer_id");

-- CreateIndex
CREATE INDEX "PollAnswerHistory_poll_option_id_idx" ON "PollAnswerHistory"("poll_option_id");

-- AddForeignKey
ALTER TABLE "Auth" ADD CONSTRAINT "Auth_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAttribute" ADD CONSTRAINT "UserAttribute_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSettings" ADD CONSTRAINT "UserSettings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserContact" ADD CONSTRAINT "UserContact_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserContact" ADD CONSTRAINT "UserContact_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConversationParticipant" ADD CONSTRAINT "ConversationParticipant_conversation_id_fkey" FOREIGN KEY ("conversation_id") REFERENCES "Conversation"("conversation_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConversationParticipant" ADD CONSTRAINT "ConversationParticipant_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_conversation_id_fkey" FOREIGN KEY ("conversation_id") REFERENCES "Conversation"("conversation_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "User"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Poll" ADD CONSTRAINT "Poll_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PollCategory" ADD CONSTRAINT "PollCategory_poll_id_fkey" FOREIGN KEY ("poll_id") REFERENCES "Poll"("poll_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PollCategory" ADD CONSTRAINT "PollCategory_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("category_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PollTranslation" ADD CONSTRAINT "PollTranslation_poll_id_fkey" FOREIGN KEY ("poll_id") REFERENCES "Poll"("poll_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PollOption" ADD CONSTRAINT "PollOption_poll_id_fkey" FOREIGN KEY ("poll_id") REFERENCES "Poll"("poll_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PollOptionTranslation" ADD CONSTRAINT "PollOptionTranslation_option_id_fkey" FOREIGN KEY ("option_id") REFERENCES "PollOption"("poll_option_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PollScaleConstraint" ADD CONSTRAINT "PollScaleConstraint_poll_id_fkey" FOREIGN KEY ("poll_id") REFERENCES "Poll"("poll_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PollAnswer" ADD CONSTRAINT "PollAnswer_poll_id_fkey" FOREIGN KEY ("poll_id") REFERENCES "Poll"("poll_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PollAnswer" ADD CONSTRAINT "PollAnswer_poll_option_id_fkey" FOREIGN KEY ("poll_option_id") REFERENCES "PollOption"("poll_option_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PollAnswer" ADD CONSTRAINT "PollAnswer_source_id_fkey" FOREIGN KEY ("source_id") REFERENCES "PollAnswerSource"("source_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PollAnswer" ADD CONSTRAINT "PollAnswer_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PollAnswerSource" ADD CONSTRAINT "PollAnswerSource_conversation_id_fkey" FOREIGN KEY ("conversation_id") REFERENCES "Conversation"("conversation_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCategoryPreference" ADD CONSTRAINT "UserCategoryPreference_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("category_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCategoryPreference" ADD CONSTRAINT "UserCategoryPreference_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCategoryPreference" ADD CONSTRAINT "UserCategoryPreference_user_settings_id_fkey" FOREIGN KEY ("user_settings_id") REFERENCES "UserSettings"("user_settings_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PollAnswerHistory" ADD CONSTRAINT "PollAnswerHistory_source_id_fkey" FOREIGN KEY ("source_id") REFERENCES "PollAnswerSource"("source_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PollAnswerHistory" ADD CONSTRAINT "PollAnswerHistory_poll_option_id_fkey" FOREIGN KEY ("poll_option_id") REFERENCES "PollOption"("poll_option_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PollAnswerHistory" ADD CONSTRAINT "PollAnswerHistory_poll_answer_id_fkey" FOREIGN KEY ("poll_answer_id") REFERENCES "PollAnswer"("poll_answer_id") ON DELETE CASCADE ON UPDATE CASCADE;
