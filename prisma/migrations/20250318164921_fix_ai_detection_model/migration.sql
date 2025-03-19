/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `AiDetection` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AiDetection" DROP COLUMN "updatedAt",
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;
