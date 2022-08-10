import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateTestEndpointInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
