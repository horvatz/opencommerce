import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { CheckoutFilterInput } from '../input/checkout-filter.input';

@ArgsType()
export class FindAllCheckoutsArgs {
  @Field({ nullable: false })
  @Type(() => CheckoutFilterInput)
  filter!: CheckoutFilterInput;
}
