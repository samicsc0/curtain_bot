/*
  Warnings:

  - You are about to drop the column `curtain_color` on the `Curtain` table. All the data in the column will be lost.
  - Added the required column `colorColor_id` to the `Curtain` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Curtain" DROP COLUMN "curtain_color",
ADD COLUMN     "colorColor_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Curtain" ADD CONSTRAINT "Curtain_colorColor_id_fkey" FOREIGN KEY ("colorColor_id") REFERENCES "Color"("color_id") ON DELETE RESTRICT ON UPDATE CASCADE;
