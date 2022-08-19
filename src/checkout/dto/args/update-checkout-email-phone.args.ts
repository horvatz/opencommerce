import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class UpdateCheckoutEmailPhoneArgs {
  @Field(() => String, { nullable: false, description: 'ID of the checkout' })
  id!: string;

  @Field(() => String, { nullable: false, description: 'Email of customer' })
  email!: string;

  @Field(() => String, { nullable: true, description: 'Phone of customer' })
  phone?: string;
}
