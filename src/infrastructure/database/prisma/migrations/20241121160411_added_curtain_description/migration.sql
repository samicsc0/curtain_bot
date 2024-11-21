/*
  Warnings:

  - Added the required column `curtain_description` to the `Curtain` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Curtain" ADD COLUMN     "curtain_description" TEXT NOT NULL;
