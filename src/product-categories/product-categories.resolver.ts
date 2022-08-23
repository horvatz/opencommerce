import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProductCategoriesService } from './product-categories.service';
import { ProductCategory } from './entities/product-category.entity';
import { CreateProductCategoryInput } from './dto/create-product-category.input';
import { UpdateProductCategoryInput } from './dto/update-product-category.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth-guard';

@Resolver(() => ProductCategory)
export class ProductCategoriesResolver {
  constructor(
    private readonly productCategoriesService: ProductCategoriesService,
  ) {}

  @Mutation(() => ProductCategory)
  @UseGuards(GqlAuthGuard)
  createProductCategory(
    @Args('category')
    category: CreateProductCategoryInput,
  ) {
    return this.productCategoriesService.create(category);
  }

  @Query(() => [ProductCategory], { name: 'productCategories' })
  findAll() {
    return this.productCategoriesService.findAll();
  }

  @Query(() => ProductCategory, { name: 'productCategory' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.productCategoriesService.findOne(id);
  }

  @Mutation(() => ProductCategory)
  @UseGuards(GqlAuthGuard)
  updateProductCategory(
    @Args('category')
    category: UpdateProductCategoryInput,
    @Args('id', { type: () => Int }) id: number,
  ) {
    return this.productCategoriesService.update(id, category);
  }

  @Mutation(() => ProductCategory)
  @UseGuards(GqlAuthGuard)
  removeProductCategory(@Args('id', { type: () => Int }) id: number) {
    return this.productCategoriesService.remove(id);
  }
}
