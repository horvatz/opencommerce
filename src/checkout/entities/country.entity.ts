import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Country {
  @Field(() => ID, { nullable: false })
  id!: number;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => String, { nullable: false })
  code!: string;
}
