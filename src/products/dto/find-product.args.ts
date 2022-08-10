import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class FindProductArgs {
  @Field(() => String, { nullable: false, description: 'ID of the product' })
  id!: string;
}
