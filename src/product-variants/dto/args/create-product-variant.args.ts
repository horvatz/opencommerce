import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { CreateProductVariantWithProductInput } from '../input/create-product-variant-with-product.input';

@ArgsType()
export class CreateProductVariantArgs {
  @Field(() => String, { nullable: false })
  productId!: string;

  @Field(() => CreateProductVariantWithProductInput, { nullable: false })
  @Type(() => CreateProductVariantWithProductInput)
  variant!: CreateProductVariantWithProductInput;
}
