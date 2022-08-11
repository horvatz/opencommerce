import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class FindCheckoutArgs {
  @Field(() => String, { nullable: false, description: 'ID of the checkout' })
  id!: string;
}
