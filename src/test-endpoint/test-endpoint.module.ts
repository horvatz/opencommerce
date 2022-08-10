import { Module } from '@nestjs/common';
import { TestEndpointService } from './test-endpoint.service';
import { TestEndpointResolver } from './test-endpoint.resolver';

@Module({
  providers: [TestEndpointResolver, TestEndpointService]
})
export class TestEndpointModule {}
