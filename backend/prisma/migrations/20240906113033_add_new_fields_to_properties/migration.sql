/*
  Warnings:

  - Added the required column `typology` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rentAmount` to the `RentalContract` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Property" ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "typology" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "RentalContract" ADD COLUMN     "extraMonth" BOOLEAN,
ADD COLUMN     "monthsDue" INTEGER,
ADD COLUMN     "paidUntil" TIMESTAMP(3),
ADD COLUMN     "rentAmount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "totalDue" DOUBLE PRECISION;
