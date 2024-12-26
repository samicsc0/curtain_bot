/*
  Warnings:

  - You are about to drop the column `is_deleteded` on the `Color` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Color" DROP COLUMN "is_deleteded",
ADD COLUMN     "is_deleted" BOOLEAN NOT NULL DEFAULT false;
