import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Token {
  @Field(() => String, { nullable: false })
  accessToken!: string;
}
