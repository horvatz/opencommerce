import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TestEndpointService } from './test-endpoint.service';
import { TestEndpoint } from './entities/test-endpoint.entity';
import { CreateTestEndpointInput } from './dto/create-test-endpoint.input';
import { UpdateTestEndpointInput } from './dto/update-test-endpoint.input';

@Resolver(() => TestEndpoint)
export class TestEndpointResolver {
  constructor(private readonly testEndpointService: TestEndpointService) {}

  @Mutation(() => TestEndpoint)
  createTestEndpoint(@Args('createTestEndpointInput') createTestEndpointInput: CreateTestEndpointInput) {
    return this.testEndpointService.create(createTestEndpointInput);
  }

  @Query(() => [TestEndpoint], { name: 'testEndpoint' })
  findAll() {
    return this.testEndpointService.findAll();
  }

  @Query(() => TestEndpoint, { name: 'testEndpoint' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.testEndpointService.findOne(id);
  }

  @Mutation(() => TestEndpoint)
  updateTestEndpoint(@Args('updateTestEndpointInput') updateTestEndpointInput: UpdateTestEndpointInput) {
    return this.testEndpointService.update(updateTestEndpointInput.id, updateTestEndpointInput);
  }

  @Mutation(() => TestEndpoint)
  removeTestEndpoint(@Args('id', { type: () => Int }) id: number) {
    return this.testEndpointService.remove(id);
  }
}
