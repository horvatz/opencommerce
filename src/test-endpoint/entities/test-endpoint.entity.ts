import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class TestEndpoint {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
