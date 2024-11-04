-- CreateEnum
CREATE TYPE "CurtainCategory" AS ENUM ('Flat', 'Patterned');

-- CreateTable
CREATE TABLE "Admin" (
    "admin_id" TEXT NOT NULL,
    "admin_first_name" TEXT NOT NULL,
    "admin_last_name" TEXT NOT NULL,
    "admin_email" TEXT NOT NULL,
    "admin_password" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("admin_id")
);

-- CreateTable
CREATE TABLE "Curtain" (
    "curtain_id" TEXT NOT NULL,
    "curtain_name" TEXT NOT NULL,
    "curtain_image_url" TEXT NOT NULL,
    "curtain_base_price" DOUBLE PRECISION NOT NULL,
    "curtain_color" TEXT NOT NULL,
    "curtain_category" "CurtainCategory" NOT NULL DEFAULT 'Flat',

    CONSTRAINT "Curtain_pkey" PRIMARY KEY ("curtain_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_admin_id_key" ON "Admin"("admin_id");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_admin_email_key" ON "Admin"("admin_email");

-- CreateIndex
CREATE UNIQUE INDEX "Curtain_curtain_id_key" ON "Curtain"("curtain_id");
