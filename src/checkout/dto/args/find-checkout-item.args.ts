import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class FindCheckoutItemArgs {
  @Field(() => String, { nullable: false, description: 'ID of the checkout' })
  id!: string;

  @Field(() => String, {
    nullable: false,
    description: 'ID of the checkout item',
  })
  variantId!: string;
}
