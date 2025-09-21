/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Hopital` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Hopital" ADD COLUMN     "slug" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Hopital_slug_key" ON "Hopital"("slug");
