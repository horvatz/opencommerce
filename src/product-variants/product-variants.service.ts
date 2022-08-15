import { Injectable } from '@nestjs/common';
import { ProductVariant } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { UserInputError } from 'apollo-server-express';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductVariantArgs } from './dto/args/create-product-variant.args';
import { FindProductVariantMediaArgs } from './dto/args/find-product-variant-media.args';
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
      include: { media: true },
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
      include: { media: true },
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
        include: { media: true },
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
        include: { media: true },
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

  async uploadMedia(
    filename: string,
    path: string,
    productVariantId: string,
  ): Promise<ProductVariant> {
    try {
      const productVariant = await this.prisma.productVariant.update({
        where: { id: productVariantId },
        data: {
          media: {
            create: {
              filename,
              path,
            },
          },
        },
        include: { media: true },
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

  async deleteMedia(
    removeProductVariantMediaArgs: FindProductVariantMediaArgs,
  ): Promise<ProductVariant> {
    const { productVariantId, mediaId } = removeProductVariantMediaArgs;
    try {
      const productVariant = await this.prisma.productVariant.update({
        where: { id: productVariantId },
        data: {
          media: {
            delete: {
              id: mediaId,
            },
          },
        },
        include: { media: true },
      });

      return productVariant;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new UserInputError('Invalid product variant or media ID');
        }
        throw error;
      }
    }
  }
}
