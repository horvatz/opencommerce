import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Decimal } from '@prisma/client/runtime';
import { GraphQLDecimal } from 'prisma-graphql-type-decimal';

@ObjectType()
export class ShippingMethod {
  @Field(() => ID, { nullable: false })
  id!: number;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => String, { nullable: true })
  description!: string | null;

  @Field(() => Int, { nullable: true })
  minDeliveryDays!: number | null;

  @Field(() => Int, { nullable: true })
  maxDeliveryDays!: number | null;

  @Field(() => GraphQLDecimal, { nullable: false })
  price!: Decimal;

  @Field(() => Boolean, { nullable: false, defaultValue: true })
  active!: boolean;
}
