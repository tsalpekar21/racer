-- CreateTable
CREATE TABLE "SiteTrainingPlan" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "plan" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SiteTrainingPlan_pkey" PRIMARY KEY ("id")
);
