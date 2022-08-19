-- DropForeignKey
ALTER TABLE "CheckoutItem" DROP CONSTRAINT "CheckoutItem_checkoutId_fkey";

-- AddForeignKey
ALTER TABLE "CheckoutItem" ADD CONSTRAINT "CheckoutItem_checkoutId_fkey" FOREIGN KEY ("checkoutId") REFERENCES "Checkout"("id") ON DELETE CASCADE ON UPDATE CASCADE;
