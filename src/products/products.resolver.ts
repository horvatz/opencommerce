import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { ProductCreateInput } from 'src/@generated/product/product-create.input';
import { ProductUpdateInput } from 'src/@generated/product/product-update.input';
import { Product } from 'src/@generated/product/product.model';
import { ProductWhereUniqueInput } from 'src/@generated/product/product-where-unique.input';

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
    @Args('updateProductInput') updateProductInput: ProductUpdateInput,
  ) {
    return this.productsService.update(updateProductInput);
  }

  @Mutation(() => Product)
  removeProduct(@Args('id') id: string) {
    return this.productsService.remove(id);
  }
}
