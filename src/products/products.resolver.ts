import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { ProductCreateInput } from 'src/@generated/product/product-create.input';
import { Product } from 'src/@generated/product/product.model';
import { ProductWhereUniqueInput } from 'src/@generated/product/product-where-unique.input';
import { ProductUpdateWithWhereUniqueWithoutTaxRateInput } from 'src/@generated/product/product-update-with-where-unique-without-tax-rate.input';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Mutation(() => Product)
  createProduct(
    @Args('createProductInput') createProductInput: ProductCreateInput,
  ) {
    return this.productsService.create(createProductInput);
  }

  @Query(() => [Product], { name: 'products' })
  findAll() {
    return this.productsService.findAll();
  }

  @Query(() => Product, { name: 'product' })
  findOne(
    @Args('productWhereUniqueInput')
    productWhereUniqueInput: ProductWhereUniqueInput,
  ) {
    return this.productsService.findOne(productWhereUniqueInput);
  }

  @Mutation(() => Product)
  updateProduct(
    @Args('updateProductInput')
    updateProductInput: ProductUpdateWithWhereUniqueWithoutTaxRateInput,
  ) {
    return this.productsService.update(updateProductInput);
  }

  @Mutation(() => Product)
  removeProduct(
    @Args('removeProductInput')
    removeProductInput: ProductWhereUniqueInput,
  ) {
    return this.productsService.remove(removeProductInput);
  }
}
