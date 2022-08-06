import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProductVariantCreateInput } from 'src/@generated/product-variant/product-variant-create.input';
import { ProductVariantUpdateWithWhereUniqueWithoutProductInput } from 'src/@generated/product-variant/product-variant-update-with-where-unique-without-product.input';
import { ProductVariantWhereUniqueInput } from 'src/@generated/product-variant/product-variant-where-unique.input';
import { ProductVariant } from 'src/@generated/product-variant/product-variant.model';
import { ProductVariantsService } from './product-variants.service';

@Resolver(() => ProductVariant)
export class ProductVariantsResolver {
  constructor(
    private readonly productVariantsService: ProductVariantsService,
  ) {}

  @Mutation(() => ProductVariant)
  createProductVariant(
    @Args('createProductVariantInput')
    createProductVariantInput: ProductVariantCreateInput,
  ) {
    return this.productVariantsService.create(createProductVariantInput);
  }

  @Query(() => [ProductVariant], { name: 'productVariants' })
  findAll() {
    return this.productVariantsService.findAll();
  }

  @Query(() => ProductVariant, { name: 'productVariant' })
  findOne(
    @Args('findOneProductVariantInput')
    findOneProductVariantInput: ProductVariantWhereUniqueInput,
  ) {
    return this.productVariantsService.findOne(findOneProductVariantInput);
  }

  @Mutation(() => ProductVariant)
  updateProductVariant(
    @Args('updateProductVariantInput')
    updateProductVariantInput: ProductVariantUpdateWithWhereUniqueWithoutProductInput,
  ) {
    return this.productVariantsService.update(updateProductVariantInput);
  }

  @Mutation(() => ProductVariant)
  removeProductVariant(
    @Args('productVariantWhereUniqueInput')
    productVariantWhereUniqueInput: ProductVariantWhereUniqueInput,
  ) {
    return this.productVariantsService.remove(productVariantWhereUniqueInput);
  }
}
