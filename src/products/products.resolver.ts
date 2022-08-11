import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { CreateProductArgs } from './dto/args/create-product.args';
import { FindProductArgs } from './dto/args/find-product.args';
import { UpdateProductArgs } from './dto/args/update-product.args';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Query(() => [Product], { name: 'products' })
  findAllProducts() {
    return this.productsService.findAll();
  }

  @Query(() => Product, { name: 'product' })
  findProduct(@Args() findProductArgs: FindProductArgs) {
    return this.productsService.findOne(findProductArgs);
  }

  @Mutation(() => Product)
  productCreate(@Args() createProductArgs: CreateProductArgs) {
    return this.productsService.create(createProductArgs);
  }

  @Mutation(() => Product)
  productUpdate(@Args() updateProductArgs: UpdateProductArgs) {
    return this.productsService.update(updateProductArgs);
  }
}
