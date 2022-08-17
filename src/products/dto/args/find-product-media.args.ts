import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class FindProductMediaArgs {
  @Field(() => String, {
    nullable: false,
    description: 'ID of the product',
  })
  productId!: string;

  @Field(() => String, {
    nullable: false,
    description: 'ID of the product media',
  })
  mediaId!: string;
}
