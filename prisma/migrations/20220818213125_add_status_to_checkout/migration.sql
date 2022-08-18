-- CreateEnum
CREATE TYPE "CheckoutStatus" AS ENUM ('OPEN', 'CLOSED', 'CANCELED');

-- AlterTable
ALTER TABLE "Checkout" ADD COLUMN     "status" "CheckoutStatus" NOT NULL DEFAULT 'OPEN';
