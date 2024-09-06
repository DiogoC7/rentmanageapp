-- AlterTable
ALTER TABLE "RentalContract" ADD COLUMN     "ativo" BOOLEAN;

-- AlterTable
ALTER TABLE "Tenant" ALTER COLUMN "nif" DROP NOT NULL;
