/*
  Warnings:

  - You are about to drop the column `productVariantId` on the `ProductMedia` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[sku]` on the table `ProductVariant` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "ProductMedia" DROP CONSTRAINT "ProductMedia_productVariantId_fkey";

-- AlterTable
ALTER TABLE "ProductMedia" DROP COLUMN "productVariantId",
ADD COLUMN     "metadata" TEXT,
ADD COLUMN     "productId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "ProductVariant_sku_key" ON "ProductVariant"("sku");

-- AddForeignKey
ALTER TABLE "ProductMedia" ADD CONSTRAINT "ProductMedia_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
