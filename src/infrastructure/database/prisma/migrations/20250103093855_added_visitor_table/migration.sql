-- CreateTable
CREATE TABLE "Visitor" (
    "visitor_id" TEXT NOT NULL,
    "telegram_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Visitor_pkey" PRIMARY KEY ("visitor_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Visitor_visitor_id_key" ON "Visitor"("visitor_id");
