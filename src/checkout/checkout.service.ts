import { Injectable } from '@nestjs/common';
import { Checkout } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { UserInputError } from 'apollo-server-express';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCheckoutItemArgs } from './dto/args/create-checkout-item.args';
import { FindAllCheckoutsArgs } from './dto/args/find-all-checkouts.args';
import { FindCheckoutItemArgs } from './dto/args/find-checkout-item.args';
import { FindCheckoutArgs } from './dto/args/find-checkout.args';
import { UpdateCheckoutAddressArgs } from './dto/args/update-checkout-address.args';
import { UpdateCheckoutEmailPhoneArgs } from './dto/args/update-checkout-email-phone.args';
import { UpdateCheckoutStatusArgs } from './dto/args/update-checkout-status.args';
import { UpdatePaymentMethodArgs } from './dto/args/update-payment-method.args';
import { UpdateShippingMethodArgs } from './dto/args/update-shipping-method.args';

@Injectable()
export class CheckoutService {
  constructor(private prisma: PrismaService) {}

  create() {
    return this.prisma.checkout.create({ data: {}, include: { items: true } });
  }

  async findAll(args: FindAllCheckoutsArgs) {
    const { filter } = args;
    const checkouts = await this.prisma.checkout.findMany({
      where: filter.status
        ? { status: filter.status, completed: true }
        : { completed: true },
      include: {
        items: {
          include: {
            variant: { include: { product: { include: { media: true } } } },
          },
        },
        shippingMethod: true,
      },
    });
    return checkouts;
  }

  async findOne(findCheckoutArgs: FindCheckoutArgs): Promise<Checkout> {
    const checkout = await this.prisma.checkout.findUnique({
      where: { id: findCheckoutArgs.id },
      include: {
        items: {
          include: {
            variant: { include: { product: { include: { media: true } } } },
          },
        },
        shippingMethod: true,
      },
    });

    if (!checkout || checkout?.completed === true) {
      throw new UserInputError('Invalid checkout ID');
    }

    return checkout;
  }

  async findCompletedCheckout(
    findCheckoutArgs: FindCheckoutArgs,
  ): Promise<Checkout> {
    const checkout = await this.prisma.checkout.findFirst({
      where: { id: findCheckoutArgs.id, completed: true },
      include: {
        items: {
          include: {
            variant: { include: { product: { include: { media: true } } } },
          },
        },
        shippingMethod: true,
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

    if (item.quantity <= 0) {
      throw new UserInputError('Invalid quantity');
    }

    // Checkout completion check
    const checkoutCompletion = await this.prisma.checkout.findUnique({
      where: { id },
    });

    if (!checkoutCompletion || checkoutCompletion?.completed === true) {
      throw new UserInputError('Invalid checkout ID');
    }

    // Check if item already exists in cart
    const existingItem = await this.prisma.checkoutItem.findFirst({
      where: {
        variant: { id: item.variantId },
        checkout: { id },
      },
      include: { variant: true, checkout: true },
    });

    // If item already exists in cart, update quantity
    if (existingItem) {
      await this.prisma.checkoutItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + item.quantity },
      });
    } else {
      // Else add item to cart
      try {
        await this.prisma.checkoutItem.create({
          data: {
            quantity: item.quantity,
            checkout: { connect: { id } },
            variant: { connect: { id: item.variantId } },
          },
        });
      } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2025') {
            throw new UserInputError('Invalid checkout or product variant ID');
          }
          throw error;
        }
      }
    }

    const checkout = await this.prisma.checkout.findUnique({
      where: { id },
      include: { items: { include: { variant: true } }, shippingMethod: true },
    });

    return checkout;
  }

  async updateCheckoutItem(
    updateCheckoutItemArgs: CreateCheckoutItemArgs,
  ): Promise<Checkout> {
    const { id, item } = updateCheckoutItemArgs;

    if (item.quantity <= 0) {
      throw new UserInputError('Invalid quantity');
    }

    // Checkout completion check
    const checkoutCompletion = await this.prisma.checkout.findUnique({
      where: { id },
    });

    if (!checkoutCompletion || checkoutCompletion?.completed === true) {
      throw new UserInputError('Invalid checkout ID');
    }

    // Check if item already exists in cart
    const existingItem = await this.prisma.checkoutItem.findFirst({
      where: { variant: { id: item.variantId }, checkout: { id } },
      include: { variant: true },
    });

    if (!existingItem) {
      throw new UserInputError('Item does not exist in this checkout');
    }

    await this.prisma.checkoutItem.update({
      where: { id: existingItem.id },
      data: { quantity: item.quantity },
    });

    const checkout = await this.prisma.checkout.findUnique({
      where: { id },
      include: { items: { include: { variant: true } }, shippingMethod: true },
    });

    return checkout;
  }

  async removeCheckoutItem(removeCheckoutItemArgs: FindCheckoutItemArgs) {
    const { id, variantId } = removeCheckoutItemArgs;

    // Checkout completion check
    const checkoutCompletion = await this.prisma.checkout.findUnique({
      where: { id },
    });

    if (!checkoutCompletion || checkoutCompletion?.completed === true) {
      throw new UserInputError('Invalid checkout ID');
    }

    const existingItem = await this.prisma.checkoutItem.findFirst({
      where: { variant: { id: variantId }, checkout: { id } },
      include: { variant: true },
    });

    if (!existingItem) {
      throw new UserInputError('Item does not exist in this checkout');
    }

    const { checkout } = await this.prisma.checkoutItem.delete({
      where: { id: existingItem.id },
      include: {
        variant: true,
        checkout: {
          include: {
            items: { include: { variant: true } },
            shippingMethod: true,
          },
        },
      },
    });

    return checkout;
  }

  async emailAndPhoneUpdate(
    updateCheckoutEmailPhoneArgs: UpdateCheckoutEmailPhoneArgs,
  ): Promise<Checkout> {
    const { id, email, phone } = updateCheckoutEmailPhoneArgs;
    try {
      const checkout = await this.prisma.checkout.update({
        where: { id },
        data: {
          email,
          phone,
        },
      });
      return checkout;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new UserInputError('Invalid checkout ID');
        }
        throw error;
      }
    }
  }

  async shippingAddressUpdate(
    updateCheckoutAddressArgs: UpdateCheckoutAddressArgs,
  ): Promise<Checkout> {
    const { country, ...address } = updateCheckoutAddressArgs.address;

    // Checkout completion check
    const checkoutCompletion = await this.prisma.checkout.findUnique({
      where: { id: updateCheckoutAddressArgs.id },
    });

    if (!checkoutCompletion || checkoutCompletion?.completed === true) {
      throw new UserInputError('Invalid checkout ID');
    }

    const countryInput = await this.prisma.country.findUnique({
      where: { code: country.code },
    });

    if (!countryInput) {
      throw new UserInputError('Invalid country code');
    }

    try {
      const checkout = this.prisma.checkout.update({
        where: { id: updateCheckoutAddressArgs.id },
        data: {
          shippingAddress: {
            ...address,
            country: { code: countryInput.code, name: countryInput.name },
          },
        },
        include: {
          items: { include: { variant: true } },
          shippingMethod: true,
        },
      });

      return checkout;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new UserInputError('Invalid checkout ID');
        }
        throw error;
      }
    }
  }

  async billingAddressUpdate(
    updateCheckoutAddressArgs: UpdateCheckoutAddressArgs,
  ): Promise<Checkout> {
    const { country, ...address } = updateCheckoutAddressArgs.address;

    // Checkout completion check
    const checkoutCompletion = await this.prisma.checkout.findUnique({
      where: { id: updateCheckoutAddressArgs.id },
    });

    if (!checkoutCompletion || checkoutCompletion?.completed === true) {
      throw new UserInputError('Invalid checkout ID');
    }

    const countryInput = await this.prisma.country.findUnique({
      where: { code: country.code },
    });

    if (!countryInput) {
      throw new UserInputError('Invalid country code');
    }

    try {
      const checkout = this.prisma.checkout.update({
        where: { id: updateCheckoutAddressArgs.id },
        data: {
          billingAddress: {
            ...address,
            country: { code: countryInput.code, name: countryInput.name },
          },
        },
        include: {
          items: { include: { variant: true } },
          shippingMethod: true,
        },
      });

      return checkout;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new UserInputError('Invalid checkout ID');
        }
        throw error;
      }
    }
  }

  async shippingMethodUpdate(
    updateShippingMethodArgs: UpdateShippingMethodArgs,
  ): Promise<Checkout> {
    const { id, shippingMethodId } = updateShippingMethodArgs;

    // Checkout completion check
    const checkoutCompletion = await this.prisma.checkout.findUnique({
      where: { id: id },
    });

    if (!checkoutCompletion || checkoutCompletion?.completed === true) {
      throw new UserInputError('Invalid checkout ID');
    }

    try {
      const checkout = this.prisma.checkout.update({
        where: { id },
        data: { shippingMethod: { connect: { id: shippingMethodId } } },
        include: {
          items: { include: { variant: true } },
          shippingMethod: true,
        },
      });

      return checkout;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new UserInputError('Invalid checkout or shipping method id');
        }
        throw error;
      }
    }
  }

  async paymentMethodUpdate(
    updatePaymentMethodArgs: UpdatePaymentMethodArgs,
  ): Promise<Checkout> {
    const { id, paymentMethod } = updatePaymentMethodArgs;

    // Checkout completion check
    const checkoutCompletion = await this.prisma.checkout.findUnique({
      where: { id: id },
    });

    if (!checkoutCompletion || checkoutCompletion?.completed === true) {
      throw new UserInputError('Invalid checkout ID');
    }

    try {
      const checkout = this.prisma.checkout.update({
        where: { id },
        data: { paymentMethod },
        include: {
          items: { include: { variant: true } },
          shippingMethod: true,
        },
      });

      return checkout;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new UserInputError('Invalid checkout or shipping method id');
        }
        throw error;
      }
    }
  }

  async statusUpdate(updateCheckoutStatusArgs: UpdateCheckoutStatusArgs) {
    const { id, status } = updateCheckoutStatusArgs;

    try {
      const checkout = this.prisma.checkout.update({
        where: { id },
        data: {
          status,
        },
        include: {
          items: { include: { variant: true } },
          shippingMethod: true,
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
      include: { items: { include: { variant: true } }, shippingMethod: true },
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

    if (!checkout.shippingMethod) {
      throw new UserInputError('Checkout must have shipping method');
    }

    if (!checkout.paymentMethod) {
      throw new UserInputError('Checkout must have shipping method');
    }

    return this.prisma.checkout.update({
      where: { id: completeCheckoutArgs.id },
      data: {
        completed: true,
      },
      include: { items: { include: { variant: true } }, shippingMethod: true },
    });
  }
}
