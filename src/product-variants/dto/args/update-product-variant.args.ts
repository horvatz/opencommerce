import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { UpdateProductVariantWithProductInput } from '../input/update-product-variant-with-product.input';

@ArgsType()
export class UpdateProductVariantArgs {
  @Field(() => String, {
    nullable: false,
    description: 'ID of the product variant',
  })
  id!: string;

  @Field(() => UpdateProductVariantWithProductInput, {
    nullable: false,
    description: 'Product variant data to update',
  })
  @Type(() => UpdateProductVariantWithProductInput)
  variant!: UpdateProductVariantWithProductInput;
}
