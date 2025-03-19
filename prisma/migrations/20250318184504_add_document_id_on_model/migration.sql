/*
  Warnings:

  - You are about to drop the column `purpose` on the `AiDetection` table. All the data in the column will be lost.
  - You are about to drop the column `readability` on the `AiDetection` table. All the data in the column will be lost.
  - You are about to drop the column `strength` on the `AiDetection` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AiDetection" DROP COLUMN "purpose",
DROP COLUMN "readability",
DROP COLUMN "strength";

-- DropEnum
DROP TYPE "Purpose";

-- DropEnum
DROP TYPE "Readability";

-- DropEnum
DROP TYPE "Strength";
