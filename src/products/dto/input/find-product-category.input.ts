import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class FindProductCategoryInput {
  @Field(() => Int, { nullable: false })
  id!: number;

  @Field(() => String, { nullable: true })
  name?: string;
}
