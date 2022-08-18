import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CheckoutItemInput {
  @Field(() => Int, { nullable: false })
  quantity!: number;

  @Field(() => String, { nullable: false })
  variantId!: string;
}
