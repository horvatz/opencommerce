import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class UpdateShippingMethodArgs {
  @Field(() => String, { nullable: false, description: 'ID of the checkout' })
  id!: string;

  @Field(() => String, {
    nullable: false,
    description: 'ID of the shipping method',
  })
  shippingMethodId!: string;
}
