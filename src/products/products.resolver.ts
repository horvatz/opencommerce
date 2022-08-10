import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { CreateProductArgs } from './dto/create-product.args';
import { FindProductArgs } from './dto/find-product.args';
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

  /*@Mutation(() => Product)
  createProduct(@Args() createProductInput: CreateProductArgs) {
    return null;
  }*/
}
