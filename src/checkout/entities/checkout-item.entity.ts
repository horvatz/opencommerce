import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { ProductVariant } from 'src/products/entities/product-variant.entity';

@ObjectType()
export class CheckoutItem {
  @Field(() => ID, { nullable: false })
  id!: string;

  @Field(() => Int, { nullable: false, defaultValue: 1 })
  quantity!: number;

  @Field(() => ProductVariant, { nullable: false })
  variant?: ProductVariant;
}
