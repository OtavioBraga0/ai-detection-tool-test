/*
  Warnings:

  - You are about to drop the column `detectedText` on the `AiDetection` table. All the data in the column will be lost.
  - Added the required column `documentId` to the `AiDetection` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AiDetection" DROP COLUMN "detectedText",
ADD COLUMN     "documentId" TEXT NOT NULL;
