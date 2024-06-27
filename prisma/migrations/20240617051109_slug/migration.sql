/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `SiteTrainingPlan` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `SiteTrainingPlan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SiteTrainingPlan" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "SiteTrainingPlan_slug_key" ON "SiteTrainingPlan"("slug");
