import { ArgsType, Field } from '@nestjs/graphql';
import { CheckoutStatus } from '@prisma/client';

@ArgsType()
export class UpdateCheckoutStatusArgs {
  @Field(() => String, { nullable: false, description: 'ID of the checkout' })
  id!: string;

  @Field(() => CheckoutStatus, { nullable: false })
  status!: CheckoutStatus;
}
