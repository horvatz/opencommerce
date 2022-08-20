import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FindUniqueUserInput {
  @Field(() => String, { nullable: false })
  email!: string;

  @Field(() => String, { nullable: false })
  password!: string;
}
