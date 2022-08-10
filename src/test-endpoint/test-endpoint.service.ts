import { Injectable } from '@nestjs/common';
import { CreateTestEndpointInput } from './dto/create-test-endpoint.input';
import { UpdateTestEndpointInput } from './dto/update-test-endpoint.input';

@Injectable()
export class TestEndpointService {
  create(createTestEndpointInput: CreateTestEndpointInput) {
    return 'This action adds a new testEndpoint';
  }

  findAll() {
    return `This action returns all testEndpoint`;
  }

  findOne(id: number) {
    return `This action returns a #${id} testEndpoint`;
  }

  update(id: number, updateTestEndpointInput: UpdateTestEndpointInput) {
    return `This action updates a #${id} testEndpoint`;
  }

  remove(id: number) {
    return `This action removes a #${id} testEndpoint`;
  }
}
