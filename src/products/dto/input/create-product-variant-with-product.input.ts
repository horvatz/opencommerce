import { Field, InputType } from '@nestjs/graphql';
import { Decimal } from '@prisma/client/runtime';
import { GraphQLDecimal } from 'prisma-graphql-type-decimal';

@InputType()
export class CreateProductVariantWithProductInput {
  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String, { nullable: true })
  sku?: string;

  @Field(() => GraphQLDecimal, { nullable: true })
  weight?: Decimal;

  @Field(() => Boolean, { nullable: true })
  available?: boolean;

  @Field(() => GraphQLDecimal, { nullable: false })
  price!: Decimal;

  @Field(() => GraphQLDecimal, { nullable: true })
  salePrice!: Decimal;
}
