import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class FindProductVariantArgs {
  @Field(() => String, {
    nullable: false,
    description: 'ID of the product variant',
  })
  id!: string;
}
