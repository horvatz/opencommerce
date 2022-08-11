import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { CreateProductInput } from '../input/create-product.input';

@ArgsType()
export class CreateProductArgs {
  @Field(() => CreateProductInput, { nullable: false })
  @Type(() => CreateProductInput)
  product!: CreateProductInput;
}
