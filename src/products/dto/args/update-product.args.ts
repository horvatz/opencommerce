import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { UpdateProductInput } from '../input/update-product.input';

@ArgsType()
export class UpdateProductArgs {
  @Field(() => String, { nullable: false, description: 'ID of the product' })
  id!: string;

  @Field(() => UpdateProductInput, {
    nullable: false,
    description: 'Product data to update',
  })
  @Type(() => UpdateProductInput)
  product!: UpdateProductInput;
}
