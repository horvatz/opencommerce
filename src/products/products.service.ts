import { Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';
import { UserInputError } from 'apollo-server-express';
import { PrismaService } from 'src/prisma/prisma.service';
import { FindProductArgs } from './dto/find-product.args';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Product[]> {
    const products = await this.prisma.product.findMany({
      include: { categories: true, variants: true, taxRate: true },
    });

    return products;
  }

  async findOne(findProductArgs: FindProductArgs): Promise<Product> {
    const product = await this.prisma.product.findUnique({
      where: { id: findProductArgs.id },
      include: { categories: true, variants: true, taxRate: true },
    });

    if (!product) {
      throw new UserInputError('Invalid product ID');
    }

    return product;
  }
}
