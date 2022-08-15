import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateProductCategoryInput {
  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => String, { nullable: true })
  description?: string;
}
