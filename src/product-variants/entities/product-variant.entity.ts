import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Decimal } from '@prisma/client/runtime';
import { GraphQLDecimal } from 'prisma-graphql-type-decimal';
import { ProductMedia } from './product-media.entity';

@ObjectType()
export class ProductVariant {
  @Field(() => ID, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => String, { nullable: true })
  description!: string | null;

  @Field(() => String, { nullable: true })
  sku!: string | null;

  @Field(() => GraphQLDecimal, { nullable: true })
  weight!: Decimal | null;

  @Field(() => Boolean, { nullable: false, defaultValue: true })
  available!: boolean;

  @Field(() => GraphQLDecimal, { nullable: false })
  price!: Decimal;

  @Field(() => GraphQLDecimal, { nullable: true })
  salePrice!: Decimal | null;

  @Field(() => [ProductMedia], { nullable: true })
  categories?: Array<ProductMedia>;
}
