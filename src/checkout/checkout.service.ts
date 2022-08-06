import { Injectable } from '@nestjs/common';
import { CreateOneCheckoutArgs } from 'src/@generated/checkout/create-one-checkout.args';
import { FindUniqueCheckoutArgs } from 'src/@generated/checkout/find-unique-checkout.args';
import { UpdateOneCheckoutArgs } from 'src/@generated/checkout/update-one-checkout.args';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CheckoutService {
  constructor(private prisma: PrismaService) {}

  create(createCheckoutInput: CreateOneCheckoutArgs) {
    return this.prisma.checkout.create(createCheckoutInput);
  }

  findAll() {
    return this.prisma.checkout.findMany();
  }

  findOne(findUniqueCheckoutInput: FindUniqueCheckoutArgs) {
    return this.prisma.checkout.findUnique({
      ...findUniqueCheckoutInput,
      include: {
        billingAddress: true,
        shippingAddress: true,
        checkoutItem: true,
      },
    });
  }

  update(updateCheckoutInput: UpdateOneCheckoutArgs) {
    return this.prisma.checkout.update(updateCheckoutInput);
  }

  remove(removeCheckoutInput: FindUniqueCheckoutArgs) {
    return this.prisma.checkout.delete(removeCheckoutInput);
  }
}
