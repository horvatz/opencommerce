/*
  Warnings:

  - The primary key for the `ShippingMethod` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('CASH', 'CREDIT_CARD');

-- DropForeignKey
ALTER TABLE "Checkout" DROP CONSTRAINT "Checkout_shippingMethodId_fkey";

-- AlterTable
ALTER TABLE "Checkout" ADD COLUMN     "paymentMethod" "PaymentMethod",
ALTER COLUMN "shippingMethodId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "ShippingMethod" DROP CONSTRAINT "ShippingMethod_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "ShippingMethod_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ShippingMethod_id_seq";

-- AddForeignKey
ALTER TABLE "Checkout" ADD CONSTRAINT "Checkout_shippingMethodId_fkey" FOREIGN KEY ("shippingMethodId") REFERENCES "ShippingMethod"("id") ON DELETE SET NULL ON UPDATE CASCADE;
