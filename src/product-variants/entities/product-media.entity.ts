import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ProductMedia {
  @Field(() => ID, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  fileName!: string;

  @Field(() => String, { nullable: false })
  path!: string;
}
