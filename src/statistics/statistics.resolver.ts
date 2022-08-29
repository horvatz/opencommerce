import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth-guard';
import { Statistics } from './entities/statistics.entity';
import { StatisticsService } from './statistics.service';

@Resolver(() => Statistics)
export class StatisticsResolver {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Query(() => Statistics, { name: 'statistics' })
  @UseGuards(GqlAuthGuard)
  allStatistics() {
    return this.statisticsService.getStatistics();
  }
}
