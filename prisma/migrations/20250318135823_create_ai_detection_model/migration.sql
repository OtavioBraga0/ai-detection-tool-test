/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Readability" AS ENUM ('HIGH_SCHOOL', 'UNIVERSITY', 'DOCTORATE', 'JOUNALIST', 'MARKETING');

-- CreateEnum
CREATE TYPE "Purpose" AS ENUM ('GENERAL_WRITING', 'ESSAY', 'ARTICLE', 'MARKETING_MATERIAL', 'STORY', 'COVER_LETTER', 'REPORT', 'BUSINESS_MATERIAL', 'LEGAL_MATERIAL');

-- CreateEnum
CREATE TYPE "Strength" AS ENUM ('QUALITY', 'BALANCED', 'MORE_HUMAN');

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "AiDetection" (
    "uid" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "detectedText" TEXT NOT NULL,
    "readability" "Readability" NOT NULL,
    "purpose" "Purpose" NOT NULL,
    "strength" "Strength" DEFAULT 'BALANCED',
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AiDetection_pkey" PRIMARY KEY ("uid")
);

-- CreateIndex
CREATE UNIQUE INDEX "AiDetection_uid_key" ON "AiDetection"("uid");
