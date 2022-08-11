import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CountryInput {
  @Field(() => String, { nullable: false })
  code!: string;

  @Field(() => String, { nullable: true })
  name?: string;
}
