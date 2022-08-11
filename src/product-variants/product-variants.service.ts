import { Injectable } from '@nestjs/common';
import { ProductVariant } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { UserInputError } from 'apollo-server-express';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductVariantArgs } from './dto/args/create-product-variant.args';
import { FindProductVariantArgs } from './dto/args/find-product-variant.args';
import { UpdateProductVariantArgs } from './dto/args/update-product-variant.args';

@Injectable()
export class ProductVariantsService {
  constructor(private prisma: PrismaService) {}

  async findOne(
    findProductVariantArgs: FindProductVariantArgs,
  ): Promise<ProductVariant> {
    const { id } = findProductVariantArgs;
    const productVariant = await this.prisma.productVariant.findUnique({
      where: { id },
    });

    if (!productVariant) {
      throw new UserInputError('Invalid product variant ID');
    }

    return productVariant;
  }

  async create(
    createProductVariantArgs: CreateProductVariantArgs,
  ): Promise<ProductVariant> {
    const { productId, variant } = createProductVariantArgs;
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new UserInputError('Invalid product ID');
    }

    const productVariant = await this.prisma.productVariant.create({
      data: { ...variant, product: { connect: { id: productId } } },
    });

    return productVariant;
  }

  async update(
    updateProductVariantArgs: UpdateProductVariantArgs,
  ): Promise<ProductVariant> {
    const { id, variant } = updateProductVariantArgs;

    try {
      const productVariant = await this.prisma.productVariant.update({
        where: { id },
        data: variant,
      });

      return productVariant;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new UserInputError('Invalid product variant ID');
        }
      }
      throw error;
    }
  }

  async delete(
    removeProductVariantArgs: FindProductVariantArgs,
  ): Promise<ProductVariant> {
    const { id } = removeProductVariantArgs;

    try {
      const productVariant = await this.prisma.productVariant.delete({
        where: { id },
      });
      return productVariant;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new UserInputError('Invalid product variant ID');
        }
        throw error;
      }
    }
  }
}
