import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserInputError } from 'apollo-server-express';
import { createWriteStream } from 'fs';
import { v4 as uuidv4 } from 'uuid';

import { CreateProductVariantMediaArgs } from './dto/args/create-product-variant-media.args';
import { CreateProductVariantArgs } from './dto/args/create-product-variant.args';
import { FindProductVariantMediaArgs } from './dto/args/find-product-variant-media.args';
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
  productVariantCreate(
    @Args() createProductVariantArgs: CreateProductVariantArgs,
  ) {
    return this.productVariantsService.create(createProductVariantArgs);
  }

  @Mutation(() => ProductVariant)
  productVariantUpdate(
    @Args() updateProductVariantArgs: UpdateProductVariantArgs,
  ) {
    return this.productVariantsService.update(updateProductVariantArgs);
  }

  @Mutation(() => ProductVariant)
  productVariantRemove(
    @Args() removeProductVariantArgs: FindProductVariantArgs,
  ) {
    return this.productVariantsService.delete(removeProductVariantArgs);
  }

  @Mutation(() => ProductVariant)
  async productVariantMediaUpload(
    @Args() createProductVariantMediaArgs: CreateProductVariantMediaArgs,
  ) {
    try {
      const { createReadStream, filename } =
        await createProductVariantMediaArgs.file;

      const generateFileName = `${uuidv4()}-${filename}`;

      createReadStream().pipe(
        createWriteStream(`./uploads/${generateFileName}`),
      );

      return this.productVariantsService.uploadMedia(
        generateFileName,
        `/uploads/${generateFileName}`,
        createProductVariantMediaArgs.productVariantId,
      );
    } catch (error) {
      throw new UserInputError('Invalid file');
    }
  }

  @Mutation(() => ProductVariant)
  productVariantMediaRemove(
    @Args() removeProductVariantMediaArgs: FindProductVariantMediaArgs,
  ) {
    this.productVariantsService.deleteMedia(removeProductVariantMediaArgs);
  }
}
