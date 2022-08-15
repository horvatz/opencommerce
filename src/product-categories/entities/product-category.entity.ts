import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ProductCategory {
  @Field(() => ID, { nullable: false })
  id!: number;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => String, { nullable: true })
  description!: string | null;
}
