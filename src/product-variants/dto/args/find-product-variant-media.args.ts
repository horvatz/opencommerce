import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class FindProductVariantMediaArgs {
  @Field(() => String, {
    nullable: false,
    description: 'ID of the product variant',
  })
  productVariantId!: string;

  @Field(() => String, {
    nullable: false,
    description: 'ID of the product variant media',
  })
  mediaId!: string;
}
