-- DropForeignKey
ALTER TABLE "Checkout" DROP CONSTRAINT "Checkout_billingAddressId_fkey";

-- DropForeignKey
ALTER TABLE "Checkout" DROP CONSTRAINT "Checkout_shippingAddressId_fkey";

-- AlterTable
ALTER TABLE "Checkout" ALTER COLUMN "shippingAddressId" DROP NOT NULL,
ALTER COLUMN "billingAddressId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Checkout" ADD CONSTRAINT "Checkout_shippingAddressId_fkey" FOREIGN KEY ("shippingAddressId") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Checkout" ADD CONSTRAINT "Checkout_billingAddressId_fkey" FOREIGN KEY ("billingAddressId") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;
