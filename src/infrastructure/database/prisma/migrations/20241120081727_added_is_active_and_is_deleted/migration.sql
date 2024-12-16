-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "is_deleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Curtain" ADD COLUMN     "is_deleted" BOOLEAN NOT NULL DEFAULT false;
