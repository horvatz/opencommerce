import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth-guard';
import { CreateProductVariantArgs } from './dto/args/create-product-variant.args';
import { FindProductVariantArgs } from './dto/args/find-product-variant.args';
import { UpdateProductVariantArgs } from './dto/args/update-product-variant.args';
import { ProductVariant } from './entities/product-variant.entity';
import { ProductVariantsService } from './product-variants.service';

@Resolver(() => ProductVariant)
export class ProductVariantsResolver {
  constructor(
    private readonly productVariantsService: ProductVariantsService,
  ) {}

  @Query(() => ProductVariant, { name: 'productVariant' })
  findProductVariant(@Args() findProductVariantArgs: FindProductVariantArgs) {
    return this.productVariantsService.findOne(findProductVariantArgs);
  }

  @Mutation(() => ProductVariant)
  @UseGuards(GqlAuthGuard)
  productVariantCreate(
    @Args() createProductVariantArgs: CreateProductVariantArgs,
  ) {
    return this.productVariantsService.create(createProductVariantArgs);
  }

  @Mutation(() => ProductVariant)
  @UseGuards(GqlAuthGuard)
  productVariantUpdate(
    @Args() updateProductVariantArgs: UpdateProductVariantArgs,
  ) {
    return this.productVariantsService.update(updateProductVariantArgs);
  }

  @Mutation(() => ProductVariant)
  @UseGuards(GqlAuthGuard)
  productVariantRemove(
    @Args() removeProductVariantArgs: FindProductVariantArgs,
  ) {
    return this.productVariantsService.delete(removeProductVariantArgs);
  }
}
