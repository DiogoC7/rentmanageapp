/*
  Warnings:

  - You are about to drop the column `ativo` on the `RentalContract` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "RentalContract" DROP COLUMN "ativo",
ADD COLUMN     "isActive" BOOLEAN;

-- AlterTable
ALTER TABLE "Tenant" ADD COLUMN     "isActive" BOOLEAN;
