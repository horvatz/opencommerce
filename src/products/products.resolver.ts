import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { CreateProductMediaArgs } from './dto/args/create-product-media.args';
import { CreateProductArgs } from './dto/args/create-product.args';
import { FindProductArgs } from './dto/args/find-product.args';
import { UpdateProductArgs } from './dto/args/update-product.args';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';
import { v4 as uuidv4 } from 'uuid';
import { createWriteStream } from 'fs';
import { UserInputError } from 'apollo-server-express';
import { FindProductMediaArgs } from './dto/args/find-product-media.args';

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

  @Mutation(() => Product)
  productRemove(@Args() removeProductArgs: FindProductArgs) {
    return this.productsService.delete(removeProductArgs);
  }

  @Mutation(() => Product)
  async productMediaUpload(
    @Args() createProductMediaArgs: CreateProductMediaArgs,
  ) {
    try {
      const { createReadStream, filename } = await createProductMediaArgs.file;

      const generateFileName = `${uuidv4()}-${filename}`;

      createReadStream().pipe(
        createWriteStream(`./uploads/${generateFileName}`),
      );

      return this.productsService.uploadMedia(
        generateFileName,
        `/uploads/${generateFileName}`,
        createProductMediaArgs.productId,
        createProductMediaArgs.metadata,
      );
    } catch (error) {
      throw new UserInputError('Invalid file');
    }
  }

  @Mutation(() => Product)
  productMediaRemove(
    @Args() removeProductVariantMediaArgs: FindProductMediaArgs,
  ) {
    return this.productsService.deleteMedia(
      removeProductVariantMediaArgs.productId,
      removeProductVariantMediaArgs.mediaId,
    );
  }
}
