import { Injectable } from '@nestjs/common';
import { Checkout } from '@prisma/client';
import { UserInputError } from 'apollo-server-express';
import { PrismaService } from 'src/prisma/prisma.service';
import { FindCheckoutArgs } from './dto/find-checkout.args';
import { UpdateCheckoutAddressArgs } from './dto/update-checkout-address.args';

@Injectable()
export class CheckoutService {
  constructor(private prisma: PrismaService) {}

  // TODO implement create
  /*create(createCheckoutInput: CreateOneCheckoutArgs) {
    return this.prisma.checkout.create(createCheckoutInput);
  }
  */

  async findOne(findCheckoutArgs: FindCheckoutArgs): Promise<Checkout> {
    const checkout = await this.prisma.checkout.findUnique({
      where: { id: findCheckoutArgs.id },
      include: {
        items: true,
      },
    });

    if (!checkout) {
      throw new UserInputError('Invalid checkout ID');
    }

    return checkout;
  }

  async shippingAddressUpdate(
    updateCheckoutAddressArgs: UpdateCheckoutAddressArgs,
  ): Promise<Checkout> {
    const { country, ...address } = updateCheckoutAddressArgs.address;

    const countryInput = await this.prisma.country.findUnique({
      where: { code: country.code },
    });

    if (!countryInput) {
      throw new UserInputError('Invalid country code');
    }

    return this.prisma.checkout.update({
      where: { id: updateCheckoutAddressArgs.id },
      data: {
        shippingAddress: {
          ...address,
          country: { code: countryInput.code, name: countryInput.name },
        },
      },
    });
  }

  async billingAddressUpdate(
    updateCheckoutAddressArgs: UpdateCheckoutAddressArgs,
  ): Promise<Checkout> {
    const { country, ...address } = updateCheckoutAddressArgs.address;

    const countryInput = await this.prisma.country.findUnique({
      where: { code: country.code },
    });

    if (!countryInput) {
      throw new UserInputError('Invalid country code');
    }

    return this.prisma.checkout.update({
      where: { id: updateCheckoutAddressArgs.id },
      data: {
        billingAddress: {
          ...address,
          country: { code: countryInput.code, name: countryInput.name },
        },
      },
    });
  }

  async complete(completeCheckoutArgs: FindCheckoutArgs): Promise<Checkout> {
    const checkout = await this.prisma.checkout.findUnique({
      where: { id: completeCheckoutArgs.id },
      include: {
        items: true,
      },
    });

    if (!checkout) {
      throw new UserInputError('Invalid checkout ID');
    }

    if (checkout.completed) {
      throw new UserInputError('Checkout is already completed');
    }

    if (!checkout.items.length) {
      throw new UserInputError('Checkout must have at least one item');
    }

    if (!checkout.billingAddress && !checkout.shippingAddress) {
      throw new UserInputError(
        'Checkout must have billing and shipping address',
      );
    }

    return this.prisma.checkout.update({
      where: { id: completeCheckoutArgs.id },
      data: {
        completed: true,
      },
    });
  }
}
