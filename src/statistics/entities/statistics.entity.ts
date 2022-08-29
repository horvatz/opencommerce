import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Statistics {
  @Field(() => Number, { nullable: false })
  openOrders!: number;

  @Field(() => Number, { nullable: false })
  closedOrders!: number;

  @Field(() => Number, { nullable: false })
  allOrders!: number;

  @Field(() => Number, { nullable: false })
  productsCount!: number;

  @Field(() => Number, { nullable: false })
  usersCount!: number;
}
