import { Module } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { StatisticsResolver } from './statistics.resolver';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [StatisticsResolver, StatisticsService],
  imports: [PrismaModule],
})
export class StatisticsModule {}
