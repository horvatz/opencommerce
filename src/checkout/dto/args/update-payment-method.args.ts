import { ArgsType, Field } from '@nestjs/graphql';
import { PaymentMethod } from '@prisma/client';

@ArgsType()
export class UpdatePaymentMethodArgs {
  @Field(() => String, { nullable: false, description: 'ID of the checkout' })
  id!: string;

  @Field(() => PaymentMethod, {
    nullable: false,
    description: 'Payment method enum',
  })
  paymentMethod!: PaymentMethod;
}
