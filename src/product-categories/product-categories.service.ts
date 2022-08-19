import { Injectable } from '@nestjs/common';
import { ProductCategory } from '@prisma/client';
import { UserInputError } from 'apollo-server-express';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductCategoryInput } from './dto/create-product-category.input';
import { UpdateProductCategoryInput } from './dto/update-product-category.input';

@Injectable()
export class ProductCategoriesService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<ProductCategory[]> {
    const productCategories = await this.prisma.productCategory.findMany({
      include: {
        products: {
          where: { active: true },
          include: {
            variants: { where: { active: true } },
            taxRate: true,
            media: true,
          },
        },
      },
    });

    return productCategories;
  }

  async findOne(id: number): Promise<ProductCategory> {
    const productCategory = await this.prisma.productCategory.findUnique({
      where: { id },
      include: {
        products: {
          where: { active: true },
          include: {
            variants: { where: { active: true } },
            taxRate: true,
            media: true,
          },
        },
      },
    });

    if (!productCategory) {
      throw new UserInputError('Invalid product category ID');
    }

    return productCategory;
  }

  async create(
    createProductCategoryInput: CreateProductCategoryInput,
  ): Promise<ProductCategory> {
    const productCategory = await this.prisma.productCategory.create({
      data: createProductCategoryInput,
    });

    return productCategory;
  }

  async update(
    id: number,
    updateProductCategoryInput: UpdateProductCategoryInput,
  ): Promise<ProductCategory> {
    const productCategory = await this.prisma.productCategory.update({
      where: { id },
      data: updateProductCategoryInput,
    });

    return productCategory;
  }

  async remove(id: number): Promise<ProductCategory> {
    const productCategory = await this.prisma.productCategory.delete({
      where: { id },
    });

    return productCategory;
  }
}
