import { Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { UserInputError } from 'apollo-server-express';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductArgs } from './dto/args/create-product.args';
import { FindProductArgs } from './dto/args/find-product.args';
import { UpdateProductArgs } from './dto/args/update-product.args';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Product[]> {
    const products = await this.prisma.product.findMany({
      include: { categories: true, variants: true, taxRate: true, media: true },
    });

    return products;
  }

  async findOne(findProductArgs: FindProductArgs): Promise<Product> {
    const product = await this.prisma.product.findUnique({
      where: { id: findProductArgs.id },
      include: { categories: true, variants: true, taxRate: true, media: true },
    });

    if (!product) {
      throw new UserInputError('Invalid product ID');
    }

    return product;
  }

  async create(createProductArgs: CreateProductArgs): Promise<Product> {
    const { product } = createProductArgs;
    const { categories, variants, taxRate, ...productData } = product;

    // Get IDs of categories to connect product to with Prisma
    const categoriesIds =
      categories?.map((category) => ({
        id: category.id,
      })) ?? [];

    try {
      const createProduct = await this.prisma.product.create({
        data: {
          ...productData,
          variants: { createMany: { data: variants ?? [] } },
          categories: { connect: categoriesIds },
          taxRate: { connect: taxRate ? { id: taxRate?.id } : undefined },
        },
        include: {
          categories: true,
          variants: true,
          taxRate: true,
          media: true,
        },
      });
      return createProduct;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        // If variant or tax rate (i.e. does not exist in db) can't be connected throw error
        if (error.code === 'P2025') {
          throw new UserInputError(
            'Provided category or tax rate does not exit',
          );
        }
        throw error;
      }
    }
  }

  async update(updateProductArgs: UpdateProductArgs): Promise<Product> {
    const { product, id } = updateProductArgs;
    const { categories, variants, taxRate, ...productData } = product;

    // Get IDs of categories to connect product to with Prisma
    const categoriesIds =
      categories?.map((category) => ({
        id: category.id,
      })) ?? [];

    try {
      const createProduct = await this.prisma.product.update({
        where: { id },
        data: {
          ...productData,
          variants: { createMany: { data: variants ?? [] } },
          categories: { connect: categoriesIds },
          taxRate: { connect: taxRate ? { id: taxRate?.id } : undefined },
        },
        include: {
          categories: true,
          variants: true,
          taxRate: true,
          media: true,
        },
      });
      return createProduct;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        // If variant or tax rate (i.e. does not exist in db) can't be connected throw error
        if (error.code === 'P2025') {
          throw new UserInputError(
            'Provided product, category or tax rate does not exist',
          );
        }
        throw error;
      }
    }
  }

  async delete(deleteProductArgs: FindProductArgs): Promise<Product> {
    const { id } = deleteProductArgs;

    try {
      const product = await this.prisma.product.delete({
        where: { id },
        include: {
          categories: true,
          variants: true,
          taxRate: true,
          media: true,
        },
      });
      console.log(product);
      return product;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new UserInputError('Invalid product ID');
        }
        throw error;
      }
    }
  }

  async uploadMedia(
    filename: string,
    path: string,
    productId: string,
    metadata?: string,
  ): Promise<Product> {
    try {
      const product = await this.prisma.product.update({
        where: { id: productId },
        data: {
          media: {
            create: {
              filename,
              path,
              metadata,
            },
          },
        },
        include: {
          categories: true,
          variants: true,
          taxRate: true,
          media: true,
        },
      });
      return product;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new UserInputError('Invalid product ID');
        }
        throw error;
      }
    }
  }

  async deleteMedia(productId: string, mediaId: string): Promise<Product> {
    try {
      const product = await this.prisma.product.update({
        where: { id: productId },
        data: {
          media: {
            delete: {
              id: mediaId,
            },
          },
        },
        include: { media: true },
      });

      return product;
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
