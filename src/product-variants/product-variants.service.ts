import { Injectable } from '@nestjs/common';
import { ProductVariantCreateInput } from 'src/@generated/product-variant/product-variant-create.input';
import { ProductVariantUpdateWithWhereUniqueWithoutProductInput } from 'src/@generated/product-variant/product-variant-update-with-where-unique-without-product.input';
import { ProductVariantWhereUniqueInput } from 'src/@generated/product-variant/product-variant-where-unique.input';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductVariantsService {
  constructor(private prisma: PrismaService) {}

  create(createProductVariantInput: ProductVariantCreateInput) {
    return this.prisma.productVariant.create({
      data: createProductVariantInput,
    });
  }

  findAll() {
    return this.prisma.productVariant.findMany({ include: { product: true } });
  }

  findOne(productVariantWhereUniqueInput: ProductVariantWhereUniqueInput) {
    return this.prisma.productVariant.findUnique({
      where: productVariantWhereUniqueInput,
      include: { product: true },
    });
  }

  update(
    productVariantUpdateInput: ProductVariantUpdateWithWhereUniqueWithoutProductInput,
  ) {
    return this.prisma.productVariant.update(productVariantUpdateInput);
  }

  remove(productVariantWhereUniqueInput: ProductVariantWhereUniqueInput) {
    return this.prisma.productVariant.delete({
      where: productVariantWhereUniqueInput,
    });
  }
}
