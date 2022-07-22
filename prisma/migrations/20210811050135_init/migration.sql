/*
  Warnings:

  - You are about to drop the column `utm_campaign` on the `Lead` table. All the data in the column will be lost.
  - You are about to drop the column `utm_content` on the `Lead` table. All the data in the column will be lost.
  - You are about to drop the column `utm_medium` on the `Lead` table. All the data in the column will be lost.
  - You are about to drop the column `utm_source` on the `Lead` table. All the data in the column will be lost.
  - You are about to drop the column `utm_term` on the `Lead` table. All the data in the column will be lost.
  - Added the required column `utm` to the `Lead` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Lead" DROP COLUMN "utm_campaign",
DROP COLUMN "utm_content",
DROP COLUMN "utm_medium",
DROP COLUMN "utm_source",
DROP COLUMN "utm_term",
ADD COLUMN     "utm" VARCHAR(500) NOT NULL;
