import { CreateTestEndpointInput } from './create-test-endpoint.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTestEndpointInput extends PartialType(CreateTestEndpointInput) {
  @Field(() => Int)
  id: number;
}
