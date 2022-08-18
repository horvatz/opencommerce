import { Injectable } from '@nestjs/common';
import { Checkout } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { UserInputError } from 'apollo-server-express';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCheckoutItemArgs } from './dto/args/create-checkout-item.args';
import { FindCheckoutArgs } from './dto/args/find-checkout.args';
import { UpdateCheckoutAddressArgs } from './dto/args/update-checkout-address.args';
import { UpdateCheckoutStatusArgs } from './dto/args/update-checkout-status.args';

@Injectable()
export class CheckoutService {
  constructor(private prisma: PrismaService) {}

  create() {
    return this.prisma.checkout.create({ data: {} });
  }

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

  async addCheckoutItem(
    createCheckoutItemArgs: CreateCheckoutItemArgs,
  ): Promise<Checkout> {
    const { id, item } = createCheckoutItemArgs;

    try {
      await this.prisma.checkoutItem.create({
        data: {
          quantity: item.quantity,
          checkout: { connect: { id } },
          variant: { connect: { id: item.variantId } },
        },
      });

      const checkout = await this.prisma.checkout.findUnique({ where: { id } });

      return checkout;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new UserInputError('Invalid checkout or product variant ID');
        }
        throw error;
      }
    }
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

  async statusUpdate(updateCheckoutStatusArgs: UpdateCheckoutStatusArgs) {
    const { id, status } = updateCheckoutStatusArgs;

    try {
      const checkout = this.prisma.checkout.update({
        where: { id },
        data: {
          status,
        },
      });

      return checkout;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        // If variant or tax rate (i.e. does not exist in db) can't be connected throw error
        if (error.code === 'P2025') {
          throw new UserInputError('Invalid checkout id');
        }
        throw error;
      }
    }
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
