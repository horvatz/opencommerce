import { Injectable } from '@nestjs/common';
import { ProductCreateInput } from 'src/@generated/product/product-create.input';
import { ProductUpdateInput } from 'src/@generated/product/product-update.input';
import { ProductWhereUniqueInput } from 'src/@generated/product/product-where-unique.input';
import { Product } from 'src/@generated/product/product.model';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  create(createProductInput: ProductCreateInput): Promise<Product> {
    return this.prisma.product.create({ data: createProductInput });
  }

  findAll() {
    return this.prisma.product.findMany({ include: { productVariants: true } });
  }

  findOne(productWhereUniqueInput: ProductWhereUniqueInput) {
    return this.prisma.product.findUnique({
      where: { id: productWhereUniqueInput.id },
      include: { productVariants: true },
    });
  }

  update(updateProductInput: ProductUpdateInput) {
    return this.prisma.product.update({
      where: { id: updateProductInput.id.set },
      data: updateProductInput,
    });
  }

  remove(id: string) {
    return this.prisma.product.delete({ where: { id } });
  }
}
