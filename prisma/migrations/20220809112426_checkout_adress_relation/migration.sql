/*
  Warnings:

  - A unique constraint covering the columns `[shippingAddressId]` on the table `Checkout` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[billingAddressId]` on the table `Checkout` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Checkout_shippingAddressId_key" ON "Checkout"("shippingAddressId");

-- CreateIndex
CREATE UNIQUE INDEX "Checkout_billingAddressId_key" ON "Checkout"("billingAddressId");
