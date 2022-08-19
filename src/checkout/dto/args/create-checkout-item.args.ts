import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { CheckoutItemInput } from '../input/checkout-item.input';

@ArgsType()
export class CreateCheckoutItemArgs {
  @Field(() => String, { nullable: false, description: 'ID of the checkout' })
  id: string;

  @Field(() => CheckoutItemInput, {
    nullable: false,
    description: 'Checkout item',
  })
  @Type(() => CheckoutItemInput)
  item!: CheckoutItemInput;
}
