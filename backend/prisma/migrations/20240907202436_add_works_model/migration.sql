-- AlterTable
ALTER TABLE "Property" ADD COLUMN     "hasWorks" BOOLEAN;

-- CreateTable
CREATE TABLE "Works" (
    "id" SERIAL NOT NULL,
    "cost" DOUBLE PRECISION NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "description" TEXT,
    "propertyId" INTEGER NOT NULL,

    CONSTRAINT "Works_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Works" ADD CONSTRAINT "Works_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
