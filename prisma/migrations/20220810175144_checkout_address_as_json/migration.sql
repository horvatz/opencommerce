/*
  Warnings:

  - You are about to drop the column `billingAddressId` on the `Checkout` table. All the data in the column will be lost.
  - You are about to drop the column `shippingAddressId` on the `Checkout` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Checkout" DROP CONSTRAINT "Checkout_billingAddressId_fkey";

-- DropForeignKey
ALTER TABLE "Checkout" DROP CONSTRAINT "Checkout_shippingAddressId_fkey";

-- DropIndex
DROP INDEX "Checkout_billingAddressId_key";

-- DropIndex
DROP INDEX "Checkout_shippingAddressId_key";

-- AlterTable
ALTER TABLE "Checkout" DROP COLUMN "billingAddressId",
DROP COLUMN "shippingAddressId",
ADD COLUMN     "billingAddress" JSONB,
ADD COLUMN     "completed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "shippingAddress" JSONB;
