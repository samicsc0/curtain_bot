-- CreateTable
CREATE TABLE "Color" (
    "color_id" TEXT NOT NULL,
    "color_name" TEXT NOT NULL,

    CONSTRAINT "Color_pkey" PRIMARY KEY ("color_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Color_color_id_key" ON "Color"("color_id");
